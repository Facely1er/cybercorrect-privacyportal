# Backup and Disaster Recovery Guide

This document outlines the comprehensive backup and disaster recovery procedures for the Privacy Self-Service Portal.

## Backup Strategy

### Data Classification

#### Critical Data (RTO: 1 hour, RPO: 15 minutes)
- User personal information
- Privacy requests and responses
- Authentication data
- Audit logs
- Configuration data

#### Important Data (RTO: 4 hours, RPO: 1 hour)
- Application logs
- Performance metrics
- User preferences
- System configurations

#### Standard Data (RTO: 24 hours, RPO: 24 hours)
- Static assets
- Documentation
- Non-critical logs

### Backup Components

#### 1. Database Backups (Supabase)
- **Frequency**: Daily automated backups
- **Retention**: 30 days (standard), 90 days (compliance)
- **Location**: Supabase managed backups + external storage
- **Encryption**: AES-256 encryption at rest

```bash
# Manual database backup
supabase db dump --file=backup_$(date +%Y%m%d_%H%M%S).sql

# Automated backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="backup_${DATE}.sql"
supabase db dump --file=$BACKUP_FILE
aws s3 cp $BACKUP_FILE s3://privacy-portal-backups/database/
```

#### 2. Application Code Backups
- **Repository**: Git-based version control
- **Frequency**: Continuous (on every commit)
- **Location**: GitHub with multiple mirrors
- **Branches**: main, develop, release branches

#### 3. Configuration Backups
- **Environment variables**: Weekly encrypted backups
- **Deployment configurations**: Version controlled
- **SSL certificates**: Monthly backups with expiration tracking

#### 4. Asset Backups
- **Static files**: Weekly backups to cloud storage
- **User uploads**: Real-time sync to backup storage
- **Build artifacts**: Retained for 90 days

## Backup Procedures

### Automated Backups

#### Database Backup Script
```bash
#!/bin/bash
# /scripts/backup-database.sh

set -e

# Configuration
BACKUP_DIR="/backups/database"
S3_BUCKET="privacy-portal-backups"
RETENTION_DAYS=30

# Create backup directory
mkdir -p $BACKUP_DIR

# Generate backup filename
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="privacy_portal_${DATE}.sql"
BACKUP_PATH="${BACKUP_DIR}/${BACKUP_FILE}"

# Create database dump
echo "Creating database backup: $BACKUP_FILE"
supabase db dump --file=$BACKUP_PATH

# Compress backup
gzip $BACKUP_PATH
COMPRESSED_FILE="${BACKUP_PATH}.gz"

# Upload to S3
echo "Uploading backup to S3..."
aws s3 cp $COMPRESSED_FILE s3://$S3_BUCKET/database/

# Cleanup old local backups
find $BACKUP_DIR -name "*.sql.gz" -mtime +$RETENTION_DAYS -delete

# Verify backup integrity
echo "Verifying backup integrity..."
gunzip -t $COMPRESSED_FILE

echo "Backup completed successfully: $BACKUP_FILE"
```

#### Configuration Backup Script
```bash
#!/bin/bash
# /scripts/backup-config.sh

set -e

# Configuration
BACKUP_DIR="/backups/config"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="config_${DATE}.tar.gz"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup environment files (encrypted)
echo "Backing up configuration files..."
tar -czf "${BACKUP_DIR}/${BACKUP_FILE}" \
  .env.example \
  netlify.toml \
  vercel.json \
  package.json \
  tsconfig.json \
  vite.config.ts

# Encrypt the backup
gpg --symmetric --cipher-algo AES256 "${BACKUP_DIR}/${BACKUP_FILE}"
rm "${BACKUP_DIR}/${BACKUP_FILE}"

# Upload to S3
aws s3 cp "${BACKUP_DIR}/${BACKUP_FILE}.gpg" s3://privacy-portal-backups/config/

echo "Configuration backup completed: ${BACKUP_FILE}.gpg"
```

### Manual Backup Procedures

#### Pre-Deployment Backup
```bash
# Create snapshot before major changes
./scripts/create-snapshot.sh "pre-deployment-$(date +%Y%m%d)"
```

#### Emergency Backup
```bash
# Quick backup for emergency situations
supabase db dump --file=emergency_backup_$(date +%Y%m%d_%H%M%S).sql
```

## Recovery Procedures

### Recovery Time Objectives (RTO) and Recovery Point Objectives (RPO)

| Scenario | RTO | RPO | Recovery Method |
|----------|-----|-----|-----------------|
| Database corruption | 1 hour | 15 minutes | Restore from latest backup |
| Application failure | 30 minutes | 0 | Redeploy from Git |
| Complete infrastructure loss | 4 hours | 1 hour | Full disaster recovery |
| Partial data loss | 2 hours | 1 hour | Selective restore |

### Database Recovery

#### Full Database Restore
```bash
#!/bin/bash
# Database recovery procedure

set -e

echo "Starting database recovery procedure..."

# 1. Stop application to prevent new data
echo "Stopping application..."
# Implementation depends on deployment method

# 2. Download latest backup
LATEST_BACKUP=$(aws s3 ls s3://privacy-portal-backups/database/ | sort | tail -n 1 | awk '{print $4}')
aws s3 cp s3://privacy-portal-backups/database/$LATEST_BACKUP ./

# 3. Decompress backup
gunzip $LATEST_BACKUP
BACKUP_FILE=${LATEST_BACKUP%.gz}

# 4. Reset database
supabase db reset --linked

# 5. Restore from backup
supabase db restore $BACKUP_FILE

# 6. Verify data integrity
echo "Verifying data integrity..."
# Add your data integrity checks here

# 7. Restart application
echo "Restarting application..."
# Implementation depends on deployment method

echo "Database recovery completed successfully"
```

#### Point-in-Time Recovery
```bash
#!/bin/bash
# Point-in-time recovery

TARGET_TIME="2024-01-15 10:30:00"
echo "Performing point-in-time recovery to: $TARGET_TIME"

# This requires transaction log backups (Supabase Pro feature)
# Contact Supabase support for point-in-time recovery assistance
```

### Application Recovery

#### Quick Application Recovery
```bash
#!/bin/bash
# Quick application recovery

set -e

echo "Starting application recovery..."

# 1. Identify last known good commit
LAST_GOOD_COMMIT=$(git log --oneline -n 10 | grep -E "(fix|stable|release)" | head -1 | cut -d' ' -f1)

# 2. Checkout last good version
git checkout $LAST_GOOD_COMMIT

# 3. Install dependencies
npm ci

# 4. Build application
npm run build

# 5. Deploy
npm run deploy

echo "Application recovery completed"
```

#### Full Infrastructure Recovery
```bash
#!/bin/bash
# Complete infrastructure recovery

set -e

echo "Starting full infrastructure recovery..."

# 1. Provision new infrastructure
# This depends on your cloud provider

# 2. Clone repository
git clone https://github.com/your-org/privacy-portal.git
cd privacy-portal

# 3. Restore configuration
aws s3 cp s3://privacy-portal-backups/config/latest-config.tar.gz.gpg ./
gpg --decrypt latest-config.tar.gz.gpg > latest-config.tar.gz
tar -xzf latest-config.tar.gz

# 4. Restore database
./scripts/restore-database.sh

# 5. Build and deploy application
npm ci
npm run build
npm run deploy

# 6. Update DNS records
# This depends on your DNS provider

# 7. Verify all services
./scripts/health-check.sh

echo "Full recovery completed"
```

## Disaster Recovery Scenarios

### Scenario 1: Database Corruption
**Symptoms**: Application errors, data inconsistencies
**Recovery Steps**:
1. Stop application immediately
2. Assess corruption extent
3. Restore from latest clean backup
4. Verify data integrity
5. Restart application
6. Monitor for issues

### Scenario 2: Complete Data Center Outage
**Symptoms**: Complete service unavailability
**Recovery Steps**:
1. Activate disaster recovery site
2. Restore database from backups
3. Deploy application to new infrastructure
4. Update DNS to point to new location
5. Verify all functionality
6. Communicate status to users

### Scenario 3: Security Breach
**Symptoms**: Unauthorized access, data compromise
**Recovery Steps**:
1. Isolate affected systems
2. Assess breach extent
3. Restore from pre-breach backup
4. Apply security patches
5. Reset all credentials
6. Notify affected users
7. Conduct security review

### Scenario 4: Accidental Data Deletion
**Symptoms**: Missing user data or requests
**Recovery Steps**:
1. Stop further operations
2. Identify deletion scope and time
3. Restore specific data from backup
4. Verify restoration accuracy
5. Implement additional safeguards
6. Document incident

## Backup Testing and Validation

### Monthly Backup Tests
```bash
#!/bin/bash
# Monthly backup validation

set -e

echo "Starting monthly backup test..."

# 1. Create test environment
./scripts/create-test-environment.sh

# 2. Restore latest backup to test environment
LATEST_BACKUP=$(aws s3 ls s3://privacy-portal-backups/database/ | sort | tail -n 1 | awk '{print $4}')
./scripts/restore-to-test.sh $LATEST_BACKUP

# 3. Run data integrity checks
./scripts/validate-data-integrity.sh

# 4. Run application tests
npm run test:e2e

# 5. Generate test report
./scripts/generate-backup-test-report.sh

# 6. Cleanup test environment
./scripts/cleanup-test-environment.sh

echo "Backup test completed successfully"
```

### Quarterly Disaster Recovery Drills
1. **Planning Phase**: Define drill objectives and scope
2. **Execution Phase**: Simulate disaster scenario
3. **Recovery Phase**: Execute recovery procedures
4. **Validation Phase**: Verify system functionality
5. **Documentation Phase**: Record lessons learned
6. **Improvement Phase**: Update procedures based on findings

## Monitoring and Alerting

### Backup Monitoring
```bash
#!/bin/bash
# Backup monitoring script

# Check if backup completed successfully
LAST_BACKUP_TIME=$(aws s3 ls s3://privacy-portal-backups/database/ | sort | tail -n 1 | awk '{print $1 " " $2}')
LAST_BACKUP_TIMESTAMP=$(date -d "$LAST_BACKUP_TIME" +%s)
CURRENT_TIMESTAMP=$(date +%s)
HOURS_SINCE_BACKUP=$(( ($CURRENT_TIMESTAMP - $LAST_BACKUP_TIMESTAMP) / 3600 ))

if [ $HOURS_SINCE_BACKUP -gt 25 ]; then
    echo "ALERT: Last backup is $HOURS_SINCE_BACKUP hours old"
    # Send alert notification
fi
```

### Recovery Testing Alerts
- Backup test failures
- RTO/RPO threshold breaches
- Data integrity check failures
- Recovery drill completion status

## Compliance and Documentation

### Regulatory Requirements
- **GDPR**: Right to data portability, backup retention
- **CCPA**: Data backup and recovery procedures
- **FERPA**: Educational record backup requirements
- **SOC 2**: Backup and recovery controls

### Documentation Requirements
- Backup schedules and procedures
- Recovery time and point objectives
- Test results and validation reports
- Incident response and recovery logs
- Change management for backup procedures

### Audit Trail
- Backup creation timestamps
- Recovery operations performed
- Data integrity validation results
- Access logs for backup systems
- Test and drill execution records

## Contacts and Escalation

### Backup Team
- **Backup Administrator**: backup-admin@company.com
- **Database Administrator**: dba@company.com
- **Infrastructure Engineer**: infra@company.com

### Emergency Contacts
- **On-call Engineer**: +1-555-ONCALL
- **Disaster Recovery Manager**: dr-manager@company.com
- **Executive Sponsor**: exec@company.com

### Vendor Contacts
- **Supabase Support**: support@supabase.com
- **AWS Support**: Enterprise support case
- **Backup Software Vendor**: vendor-support@company.com

## Continuous Improvement

### Regular Reviews
- Monthly backup procedure review
- Quarterly RTO/RPO assessment
- Annual disaster recovery plan update
- Continuous monitoring optimization

### Metrics and KPIs
- Backup success rate (target: 99.9%)
- Recovery time actual vs. RTO
- Data loss actual vs. RPO
- Test success rate
- Mean time to recovery (MTTR)

### Documentation Updates
- Procedure refinements based on lessons learned
- Technology changes and updates
- Regulatory requirement changes
- Contact information updates
- Process automation improvements
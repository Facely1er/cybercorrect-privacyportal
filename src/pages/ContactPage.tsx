import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, HelpCircle, Bug, BookOpen, GraduationCap, FileText } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { useBrand } from '../hooks/useBrand';

export function ContactPage() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    institution: '',
    role: '',
    subject: '',
    category: 'general',
    message: '',
    priority: 'medium'
  });

  const { brand } = useBrand();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const supportCategories = [
    { value: 'general', label: 'General Inquiry', icon: <MessageCircle className="h-4 w-4" /> },
    { value: 'technical', label: 'Technical Support', icon: <Bug className="h-4 w-4" /> },
    { value: 'training', label: 'Training Questions', icon: <HelpCircle className="h-4 w-4" /> },
    { value: 'compliance', label: 'Compliance Guidance', icon: <HelpCircle className="h-4 w-4" /> }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Contact Support</h1>
        <p className="text-muted-foreground">
          Get help with privacy compliance, technical issues, or general questions about {brand.brandName}.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-gray-50 dark:bg-gray-950 rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-6">Send us a message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                    placeholder="your.email@school.edu"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="institution" className="block text-sm font-medium mb-2">
                    Institution
                  </label>
                  <input
                    type="text"
                    id="institution"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                    placeholder="Your school or district"
                  />
                </div>
                
                <div>
                  <label htmlFor="role" className="block text-sm font-medium mb-2">
                    Your Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                  >
                    <option value="">Select your role</option>
                    <option value="administrator">Administrator</option>
                    <option value="teacher">Teacher</option>
                    <option value="it-staff">IT Staff</option>
                    <option value="student">Student</option>
                    <option value="parent">Parent</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                  >
                    {supportCategories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium mb-2">
                    Priority
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                  placeholder="Brief description of your inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm resize-none"
                  placeholder="Please provide details about your question or issue..."
                />
              </div>

              <Button type="submit" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          {/* Contact Details */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary-600 mt-0.5" />
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-sm text-muted-foreground">{brand.contact.supportEmail}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary-600 mt-0.5" />
                <div>
                  <p className="font-medium">Phone Support</p>
                  <p className="text-sm text-muted-foreground">{brand.contact.phone}</p>
                  <p className="text-xs text-muted-foreground">Monday-Friday, 8 AM - 6 PM EST</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary-600 mt-0.5" />
                <div>
                  <p className="font-medium">Office Address</p>
                  <p className="text-sm text-muted-foreground">
                    {brand.contact.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Support Hours */}
          <div className="bg-gray-50 dark:bg-gray-950 rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Support Hours
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span className="text-muted-foreground">8:00 AM - 6:00 PM EST</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span className="text-muted-foreground">10:00 AM - 2:00 PM EST</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="text-muted-foreground">Closed</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <p className="text-xs text-blue-700 dark:text-blue-300">
                For urgent issues outside business hours, please mark your inquiry as "Urgent" and we'll respond as soon as possible.
              </p>
            </div>
          </div>

          {/* FAQ Link */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-2">Quick Answers</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Check our frequently asked questions for immediate answers to common inquiries.
            </p>
            <Link to="/faq">
              <Button variant="outline" className="w-full">
                <HelpCircle className="mr-2 h-4 w-4" />
                View FAQ
              </Button>
            </Link>
            
            <div className="mt-4 pt-4 border-t">
              <h4 className="font-medium mb-2">Self-Service Resources</h4>
              <div className="space-y-2">
                <Link to="/how-it-works" title="Learn how our platform works" className="block">
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <BookOpen className="h-4 w-4 mr-2" />
                    How {brand.brandName} Works
                  </Button>
                </Link>
                <Link to="/training" title="Access self-paced training guides" className="block">
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Self-Paced Training
                  </Button>
                </Link>
                <Link to="/resources" title="Download helpful resources and templates" className="block">
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Resource Library
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
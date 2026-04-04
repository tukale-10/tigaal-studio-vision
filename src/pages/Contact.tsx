import { useState } from "react";
import PageHero from "@/components/PageHero";
import { Phone, Mail, MapPin, Globe } from "lucide-react";

const subjects = ["Research", "M&E", "Communications", "Investment Advisory", "Partnership", "Other"];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", organization: "", subject: "", message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:info@tigaal.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nOrganization: ${formData.organization}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;
  };

  return (
    <main>
      <PageHero title="Contact Us" subtitle="We welcome enquiries from potential clients, partners, and collaborators" breadcrumb="Contact" />

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Get In Touch</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Whether you are planning a research initiative, seeking a third-party monitoring partner, or exploring investment opportunities in Somalia, our team is ready to discuss how Tigaal can support your objectives.
              </p>

              {[
                { icon: Phone, label: "Phone", value: "+252 (0) 61 5595452" },
                { icon: Mail, label: "Email", value: "info@tigaal.com" },
                { icon: MapPin, label: "Address", value: "Airport Road, Wadajir District, Mogadishu" },
                { icon: Globe, label: "Website", value: "www.tigaal.com" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 bg-secondary rounded-xl p-5 border border-border">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="text-accent" size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">{item.label}</div>
                    <div className="text-foreground font-medium">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-secondary rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Organization</label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({...formData, organization: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Subject *</label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                    >
                      <option value="">Select a subject</option>
                      {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-1.5">Message *</label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
                  />
                </div>
                <button type="submit" className="px-10 py-3.5 bg-accent text-accent-foreground font-semibold rounded-md hover:bg-accent/90 transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Map */}
          <div className="mt-16 max-w-6xl mx-auto rounded-2xl overflow-hidden border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.0!2d45.3!3d2.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMsKwMDMnMDAuMCJOIDQ1wrAxOCcwMC4wIkU!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="TIGAAL Office Location - Mogadishu"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;

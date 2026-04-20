import { useState } from "react";
import PageHero from "@/components/PageHero";
import { Phone, Mail, MapPin, Globe, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const subjects = ["Research", "M&E", "Communications", "Investment Advisory", "Partnership", "Other"];

const contactDetails = [
  { icon: Phone, label: "Phone", value: "+252 613 926 664" },
  { icon: Mail, label: "Email", value: "info@tigaal.com" },
  { icon: MapPin, label: "Address", value: "Airport Road, Wadajir District, Mogadishu" },
  { icon: Globe, label: "Website", value: "www.tigaal.com" },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", organization: "", subject: "", message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const id = crypto.randomUUID();
      const { error: insertError } = await supabase.from("contact_submissions").insert({
        id,
        name: formData.name,
        email: formData.email,
        organization: formData.organization || null,
        subject: formData.subject,
        message: formData.message,
      });
      if (insertError) throw insertError;

      await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-confirmation",
          recipientEmail: formData.email,
          idempotencyKey: `contact-confirm-${id}`,
          templateData: { name: formData.name, subject: formData.subject },
        },
      });

      await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-notification",
          recipientEmail: "info@tigaal.com",
          idempotencyKey: `contact-notify-${id}`,
          templateData: {
            name: formData.name,
            email: formData.email,
            organization: formData.organization,
            subject: formData.subject,
            message: formData.message,
          },
        },
      });

      setSubmitted(true);
      setFormData({ name: "", email: "", organization: "", subject: "", message: "" });
    } catch (err) {
      console.error("Contact submission failed", err);
      toast({
        title: "Something went wrong",
        description: "Please try again or email us directly at info@tigaal.com.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main>
      <PageHero title="Contact Us" subtitle="We welcome enquiries from potential clients, partners, and collaborators" breadcrumb="Contact" />

      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div>
              <span className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
                Reach Out
              </span>
              <h2 className="font-display text-3xl text-foreground mb-6">Get In Touch</h2>
              <p className="text-muted-foreground leading-relaxed mb-10">
                Whether you are planning a research initiative, seeking a third-party monitoring partner, or exploring investment opportunities in Somalia, our team is ready to discuss how Tigaal can support your objectives.
              </p>

              <div className="space-y-3">
                {contactDetails.map((item) => (
                  <div key={item.label} className="flex items-start gap-4 bg-secondary rounded-sm p-5 border border-border hover:border-accent/30 transition-colors group">
                    <div className="w-10 h-10 bg-accent/10 rounded-sm flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                      <item.icon className="text-accent" size={18} />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-muted-foreground tracking-wider uppercase">{item.label}</div>
                      <div className="text-foreground font-medium text-sm mt-0.5">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-secondary rounded-sm p-8 lg:p-12 border border-border">
                <span className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
                  Send a Message
                </span>
                <h2 className="font-display text-2xl text-foreground mb-8">Tell us about your project</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-2 tracking-wide uppercase">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-sm border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-2 tracking-wide uppercase">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-sm border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-2 tracking-wide uppercase">Organization</label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({...formData, organization: e.target.value})}
                      className="w-full px-4 py-3 rounded-sm border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-2 tracking-wide uppercase">Subject *</label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full px-4 py-3 rounded-sm border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
                    >
                      <option value="">Select a subject</option>
                      {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-xs font-semibold text-foreground mb-2 tracking-wide uppercase">Message *</label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 rounded-sm border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="group inline-flex items-center gap-2 px-10 py-4 bg-accent text-accent-foreground font-semibold rounded-sm hover:bg-accent/90 transition-all"
                >
                  Send Message <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>

          {/* Map */}
          <div className="mt-20 max-w-6xl mx-auto rounded-sm overflow-hidden border border-border">
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

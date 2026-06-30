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
      <PageHero title="Contact Us" subtitle="We welcome enquiries from prospective clients, partners, and collaborators." breadcrumb="Contact" />

      <section className="py-28 lg:py-40">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-10 bg-accent" />
                <span className="text-accent text-[11px] font-semibold tracking-[0.32em] uppercase">Reach Out</span>
              </div>
              <h2 className="font-display text-3xl lg:text-4xl text-foreground mb-6 tracking-tight leading-tight">Get in touch.</h2>
              <p className="text-muted-foreground leading-[1.75] mb-10 font-light">
                Whether you're planning a research initiative, seeking a third-party monitoring partner, or exploring investment opportunities in Somalia, our team is ready to discuss how TIGAAL can support your objectives.
              </p>

              <div className="space-y-3">
                {contactDetails.map((item) => (
                  <div key={item.label} className="flex items-start gap-4 bg-background rounded-2xl p-5 border border-border/60 hover:border-accent/30 transition-colors group">
                    <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="text-accent" size={18} />
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold text-muted-foreground tracking-[0.2em] uppercase">{item.label}</div>
                      <div className="text-foreground font-medium text-sm mt-1">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-background rounded-2xl p-10 lg:p-14 border border-border/60 text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="text-accent" size={32} />
                  </div>
                  <h2 className="font-display text-3xl text-foreground mb-4 tracking-tight">Your message was received.</h2>
                  <p className="text-muted-foreground leading-[1.75] mb-8 max-w-md mx-auto font-light">
                    Thank you for reaching out. Someone from our team will reach out to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-2 px-8 py-3 border border-border text-foreground font-medium rounded-full hover:border-accent/50 transition-all"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
              <form onSubmit={handleSubmit} className="bg-background rounded-2xl p-10 lg:p-14 border border-border/60">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px w-10 bg-accent" />
                  <span className="text-accent text-[11px] font-semibold tracking-[0.32em] uppercase">Send a Message</span>
                </div>
                <h2 className="font-display text-3xl text-foreground mb-10 tracking-tight">Tell us about your project.</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-[10px] font-semibold text-foreground mb-2 tracking-[0.2em] uppercase">Name *</label>
                    <input
                      type="text"
                      required
                      disabled={submitting}
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/30 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-foreground mb-2 tracking-[0.2em] uppercase">Email *</label>
                    <input
                      type="email"
                      required
                      disabled={submitting}
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/30 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-[10px] font-semibold text-foreground mb-2 tracking-[0.2em] uppercase">Organization</label>
                    <input
                      type="text"
                      disabled={submitting}
                      value={formData.organization}
                      onChange={(e) => setFormData({...formData, organization: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/30 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-foreground mb-2 tracking-[0.2em] uppercase">Subject *</label>
                    <select
                      required
                      disabled={submitting}
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/30 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all disabled:opacity-50"
                    >
                      <option value="">Select a subject</option>
                      {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-[10px] font-semibold text-foreground mb-2 tracking-[0.2em] uppercase">Message *</label>
                  <textarea
                    required
                    rows={6}
                    disabled={submitting}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/30 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all resize-none disabled:opacity-50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="group inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-accent-foreground font-medium rounded-full hover:bg-accent/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>Sending… <Loader2 size={16} className="animate-spin" /></>
                  ) : (
                    <>Send message <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>
              </form>
              )}
            </div>
          </div>

          {/* Map */}
          <div className="mt-24 max-w-6xl mx-auto rounded-2xl overflow-hidden border border-border/60 shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.0!2d45.3!3d2.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMsKwMDMnMDAuMCJOIDQ1wrAxOCcwMC4wIkU!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
              width="100%"
              height="420"
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

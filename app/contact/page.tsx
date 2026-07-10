import { PageHeader } from "@/components/shared/page-header";
import { ContactForm } from "@/features/contact/contact-form";
import { getSiteInfo } from "@/lib/data/site";

export default async function ContactPage() {
  const siteInfo = await getSiteInfo();

  return (
    <>
      <PageHeader badge="Contact" title="Get in Touch" description="Ready to start your next engineering project? Let's talk." />
      <ContactForm siteInfo={siteInfo} />
    </>
  );
}

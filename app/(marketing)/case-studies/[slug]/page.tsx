import { notFound } from "next/navigation";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getCaseStudyBySlug, getAllCaseStudySlugs } from "@/app/data/case-studies-data";
import ClientWrapper from "./ClientWrapper";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all case studies
export async function generateStaticParams() {
  const slugs = getAllCaseStudySlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  
  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: `${caseStudy.title} - Incial`,
    description: caseStudy.heroQuote,
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  // If case study not found, show 404
  if (!caseStudy) {
    notFound();
  }

  return (
    <ClientWrapper>
      {/* Main Content */}
      <main className="pt-32 pb-20">
        {/* Breadcrumb */}
        <div className="mb-10 flex items-center gap-2 text-sm px-6 md:px-16 lg:px-24 xl:px-32 max-w-[1400px] mx-auto">
          <a
            href="/"
            className="text-blue-500 hover:text-blue-400 transition-colors"
          >
            Home
          </a>
          <span className="text-gray-500">›</span>
          <a
            href="/case-studies"
            className="text-blue-500 hover:text-blue-400 transition-colors"
          >
            Work
          </a>
          <span className="text-gray-500">›</span>
          <span className="text-gray-400">{caseStudy.title}</span>
        </div>

        {/* Hero Section with Image */}
        <section className="mb-16 relative px-6 md:px-16 lg:px-24">
          <div className="max-w-[1400px] mx-auto">
            {/* Hero Image with overlay text */}
            <div 
              className="relative w-full overflow-hidden"
              style={{
                maxWidth: '1256px',
                height: '320px',
                borderRadius: '25px',
                margin: '0 auto'
              }}
            >
              <Image
                src={caseStudy.heroImage}
                alt={caseStudy.title}
                fill
                className="object-cover"
                priority
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/60" />
              
              {/* Text content overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-10 lg:p-12">
                {/* Title at top */}
                <h1 
                  className="text-white max-w-3xl"
                  style={{
                    fontFamily: 'Poppins',
                    fontWeight: 700,
                    fontSize: 'clamp(20px, 3.5vw, 32px)',
                    lineHeight: '120%',
                    letterSpacing: '0%'
                  }}
                >
                  {caseStudy.title}
                </h1>
                
                {/* Hero quote at bottom */}
                <p 
                  className="text-white max-w-4xl italic"
                  style={{
                    fontFamily: 'Poppins',
                    fontWeight: 400,
                    fontSize: 'clamp(13px, 2vw, 18px)',
                    lineHeight: '140%',
                    letterSpacing: '0%'
                  }}
                >
                  "{caseStudy.heroQuote}"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content Container - Introduction and Sections */}
        <div 
          className="px-6 md:px-8"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '50px'
          }}
        >
          {/* Introduction */}
          <section className="max-w-[900px] mx-auto">
            <p 
              className="text-gray-300"
              style={{
                fontFamily: 'Poppins',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '180%',
                letterSpacing: '0%'
              }}
            >
              {caseStudy.introduction}
            </p>
          </section>

          {/* Content Sections */}
          <div className="max-w-[900px] mx-auto w-full space-y-12">
            {caseStudy.sections.map((section: { title: string; content: string }, index: number) => (
              <section key={index}>
                {section.title && (
                  <h2 
                    className="text-white mb-3"
                    style={{
                      fontFamily: 'Poppins',
                      fontWeight: 700,
                      fontSize: '18px',
                      lineHeight: '140%'
                    }}
                  >
                    {section.title}
                  </h2>
                )}
                {section.content && (
                  <p 
                    className="text-gray-300"
                    style={{
                      fontFamily: 'Poppins',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '180%',
                      letterSpacing: '0%'
                    }}
                  >
                    {section.content}
                  </p>
                )}
              </section>
            ))}
          </div>

          {/* Closing CTA */}
          <section className="max-w-[900px] mx-auto">
            <p 
              className="text-gray-300 italic"
              style={{
                fontFamily: 'Poppins',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '180%',
                letterSpacing: '0%'
              }}
            >
              At Incial, we don't just design logos or build websites; we craft digital platforms that define brands and
              make a real impact. Whether you're a startup or a global ecosystem, we're here to bring your vision into the
              digital world with creativity and impact.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 max-w-[1400px] mx-auto mt-20">
        <Footer />
      </div>
    </ClientWrapper>
  );
}
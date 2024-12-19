import React from "react";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import WavingHandOutlinedIcon from "@mui/icons-material/WavingHandOutlined";
import { modificationTypes, navLinks } from "@/constants";

const FeatureCard = ({
  Icon,
  title,
  description,
  route,
  className = "",
}: {
  Icon: React.ElementType;
  title?: string;
  description?: string;
  route: string;
  className?: string;
}) => (
  <Link className={`homepage-feature-card ${className}`} href={route} passHref>
    <Icon className="homepage-feature-icon" />
    <h3 className="homepage-feature-title">{title}</h3>
    <p className="homepage-feature-description">{description}</p>
  </Link>
);

const HomePage = async () => {
  const { userId } = auth();

  return (
    <>
      {/* Hero Section */}
      <section className="homepage-hero">
        <div className="max-w-6xl text-center flex flex-col items-center">
          <h1 className="homepage-hero-title">
            Transform Your Images with <span>Infinify AI</span>
          </h1>
          <p className="homepage-hero-description">
            Unleash the power of artificial intelligence to edit, enhance, and
            reimagine your images with just a few clicks.
          </p>

          {!userId ? (
            <Link href="/sign-in" className="homepage-cta-button">
              <WavingHandOutlinedIcon /> Get Started for Free
            </Link>
          ) : (
            <Link href="/profile" className="homepage-cta-button ">
              Go to Dashboard
            </Link>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto">
          <h2 className="page-title text-center mb-6">
            Powerful AI Image Editing Tools
          </h2>
          <div className="homepage-features-grid">
            {navLinks
              .filter(({ available }) => available) // Only show available links
              .map(({ label, route }) => {
                const {
                  icon: Icon,
                  title,
                  description,
                } = Object.values(modificationTypes).find(
                  (mod) => mod.title === label,
                ) || {};
                if (!Icon) return null; // Skip if no corresponding modification type

                return (
                  <FeatureCard
                    key={label}
                    Icon={Icon}
                    title={title}
                    description={description}
                    route={route}
                    className="bg-white"
                  />
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;

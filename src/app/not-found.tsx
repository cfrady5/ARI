import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import { GradientOrb } from "@/components/visual/Decor";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden pt-[var(--header-height)]">
      <GradientOrb className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2" />
      <Container className="relative text-center">
        <p className="eyebrow-plain">Error 404</p>
        <h1 className="mt-4 text-5xl font-extrabold sm:text-6xl">
          Page not <span className="accent">found.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-ari-muted">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
          Let&rsquo;s get you back on mission.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" icon="arrow-right">
            Back to Home
          </Button>
          <Button href="/initiatives" variant="secondary">
            Explore Initiatives
          </Button>
        </div>
      </Container>
    </section>
  );
}

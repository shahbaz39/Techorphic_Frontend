import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export default async function CaseStudyPage({ params }: Props) {
  const { id } = params;

  // ✅ fetch the case study from Strapi (replace URL with your API)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/case-studies/${id}`, {
    cache: "no-store", // so you always see updates
  });

  if (!res.ok) {
    return notFound();
  }

  const caseStudy = await res.json();

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold mb-6">{caseStudy.title}</h1>
      <p className="text-lg text-gray-700 mb-8">
        {caseStudy.description || "No description available."}
      </p>
      <img
        src={caseStudy.image?.url || "/placeholder.svg"}
        alt={caseStudy.title}
        className="rounded-lg shadow-lg"
      />
    </div>
  );
}

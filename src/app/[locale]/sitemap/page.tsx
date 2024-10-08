import Link from "next/link";
import { useTranslations } from 'next-intl';
import { getServices } from "@/utils/heroSelection";
import { getPdfTools } from "@/utils/pdfSelection";
import { getCalcTools } from "@/utils/calculatorSelection";
import { getConversionsTools } from "@/utils/conversionsSelection";

type Tool = {
  title: string;
  description: string;
  link: string;
};

const Sitemap = () => {
  const t = useTranslations('Sitemap');

  return (
    <div className="container mx-auto py-32">
      <h1 className="text-3xl font-bold mb-4">Sitemap</h1>

      {/* Services */}
      <h2 className="text-2xl font-semibold mt-6">Services</h2>
      <ul className="list-disc text-blue-600 ml-6">
        {getServices(t).map((service: Tool, index: number) => (
          <li key={index}>
            <Link href={service.link}>{service.title}</Link>
          </li>
        ))}
      </ul>

      {/* PDF Tools */}
      <h2 className="text-2xl font-semibold mt-6">PDF Tools</h2>
      <ul className="list-disc text-blue-600 ml-6">
        {getPdfTools(t).map((tool: Tool, index: number) => (
          <li key={index}>
            <Link href={tool.link}>{tool.title}</Link>
          </li>
        ))}
      </ul>

      {/* Calculator Tools */}
      <h2 className="text-2xl font-semibold mt-6">Calculator Tools</h2>
      <ul className="list-disc text-blue-600 ml-6">
        {getCalcTools(t).map((tool: Tool, index: number) => (
          <li key={index}>
            <Link href={tool.link}>{tool.title}</Link>
          </li>
        ))}
      </ul>

      {/* Conversion Tools */}
      <h2 className="text-2xl font-semibold mt-6">Conversion Tools</h2>
      <ul className="list-disc text-blue-600 ml-6">
        {getConversionsTools(t).map((tool: Tool, index: number) => (
          <li key={index}>
            <Link href={tool.link}>{tool.title}</Link>
          </li>
        ))}
      </ul>

      {/* Other Pages */}
      <h2 className="text-2xl font-semibold mt-6">Other Pages</h2>
      <ul className="list-disc text-blue-600 ml-6">
        <li>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </li>
        <li>
          <Link href="/terms-of-service">Terms of Service</Link>
        </li>
        <li>
          <Link href="/sitemap">Sitemap</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sitemap;

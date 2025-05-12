import { useT } from "@/hooks/LangContext";
import CompCard from "./components/CompCard";
import { Cards } from "./components/CardData";

const EComp = () => {
  const T = useT();
  return (
    <div className="container mx-auto  flex flex-col gap-12 py-8">
      <header className="bg-background text-foreground transition-colors duration-300">
        <h1 className="text-2xl text-center font-bold text-primary">
          {T("مكونات الدفيئة الذكية", "Smart Greenhouse Components")}
        </h1>
      </header>
      <div
        className={`grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10  min-h-screen`}
      >
        {Cards()?.map(
          ({ title, image, description, scientificPrinciple, List }, index) => (
            <CompCard
              key={`card-${index}`}
              title={title}
              image={image}
              description={description}
              List={List}
              scientificPrinciple={scientificPrinciple}
            />
          )
        )}
      </div>
      <footer className="bg-card  py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>
            {T(
              "مكونات الدفيئة الذكية - دليل شامل",
              "Smart Greenhouse Components - A Comprehensive Guide"
            )}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default EComp;

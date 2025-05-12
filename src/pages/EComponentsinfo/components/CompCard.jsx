import { useLang, useT } from "@/hooks/LangContext";

const CompCard = ({ title, image, description, scientificPrinciple, List }) => {
  const { lang } = useLang();
  const T = useT();
  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="bg-accent p-4">
        <h2 className="text-xl font-semibold text-accent-foreground">
          {title}
        </h2>
      </div>
      <div className="p-6">
        <img
          src={image}
          alt="BME680 Sensor"
          className="w-full h-48 object-contain mb-4"
        />
        <p className="text-card-foreground mb-4">{description}</p>
        <ul className="list-disc pl-5 mb-4 text-card-foreground">{List}</ul>
        <p className="text-muted-foreground text-sm">
          <strong>{T("المبدأ العلمي:", "Scientific principle:")}</strong>{" "}
          {scientificPrinciple}
        </p>
      </div>
    </div>
  );
};

export default CompCard;

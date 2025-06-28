import React, { useEffect, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  ArrowRight,
  Leaf,
  Droplet,
  Thermometer,
  Sun,
  Activity,
  ArrowUpRight,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/AuthContext";

import { useT } from "@/hooks/LangContext";
import Threads from "@/reactBits/Threads";
import SpotlightCard from "@/reactBits/SpotLightCard";
import { useTheme } from "@/hooks/themeprovider";
import BlurText from "@/reactBits/BlurText";
import { useAnimation, useInView, motion } from "framer-motion";

const LandingPage = () => {
  const [size, setSize] = useState(() => {
    return window.matchMedia("(max-width: 1024px)").matches ? "small" : "big";
  });

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");

    const updateSize = () => {
      const newSize = mq.matches ? "small" : "big";
      setSize(newSize);
    };

    updateSize();

    mq.addEventListener("change", updateSize);

    return () => {
      mq.removeEventListener("change", updateSize);
    };
  }, []);
  useEffect(() => {
    console.log("size", size);
  }, [size]);

  return (
    <div className="">
      <div className="min-h-screen bg-background">
        <HeroSection />
        <div
          style={{
            width: "100%",
            height: size === "small" ? "300px" : "450px",
            position: "relative",
          }}
        >
          <Threads
            amplitude={2}
            distance={0}
            enableMouseInteraction={size === "small" ? false : true}
          />
        </div>
        <ComponentsSection />
        <SystemArcSection />
        <FeatureSection />
        <CallToAction />
      </div>
    </div>
  );
};

const HeroSection = () => {
  const T = useT();
  const { auth } = useAuth();
  const { isDark } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const controls = useAnimation();

  const text = T(
    "التحكم البيئي المتقدم والمراقبة لنمو النباتات الأمثل، مدعوم بأحدث تقنيات الاستشعار والأتمتة الذكية.",
    "Advanced environmental control and monitoring for optimal plant growth, powered by cutting edge sensor technology and intelligent automation."
  );

  const letters = text.split("");

  // detect Arabic: simple regex for Arabic unicode block
  const isArabic = /[\u0600-\u06FF]/.test(text);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.01,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: `1em` },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ease: "easeOut", duration: 0.5 },
    },
  };

  if (inView) {
    controls.start("visible");
  }
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <h1
              dir={T("rtl", "ltr")}
              className="max-w-lg text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            >
              <BlurText
                text={T("الدفيئة الذكية", "Smart Greenhouse")}
                delay={150}
                animateBy="words"
                direction="top"
                className=" mb-8"
              />
            </h1>
            <motion.p
              dir={T("rtl", "ltr")}
              className=" text-lg break-words text-muted-foreground sm:block hidden mb-8 max-w-[540px]"
              ref={ref}
              initial="hidden "
              animate={controls}
              variants={containerVariants}
            >
              {letters.map((char, index) => (
                <motion.span key={index} variants={letterVariants}>
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={auth ? "/dashboard/charts" : "/signIn"}
                className="px-6 py-3 flex justify-center md:justify-start  bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                {T("ابدأ الآن", "Get Started")}
              </Link>
              <Link
                to={"/comp"}
                className="px-6 py-3 bg-accent text-accent-foreground rounded-md font-medium hover:bg-accent/80 flex items-center justify-center gap-2 transition-colors"
              >
                {T("عرض المكونات", "View Components")}{" "}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative bg-accent p-6 rounded-lg shadow-xl border border-border">
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground p-2 rounded-md text-sm font-medium">
                {T("تقنية ذكية", "Smart Technology")}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <SpotlightCard
                  className={`p-4 rounded-xl ${
                    isDark ? "bg-black" : "bg-white"
                  }`}
                  spotlightColor={
                    isDark ? "rgba(255, 255, 255, 0.25)" : "rgba(0, 0, 0, 0.25)"
                  }
                >
                  <Thermometer className="text-primary h-8 w-8 mb-2" />
                  <h3 className="font-medium mb-1">
                    {T("استشعار بيئي", "Environmental Sensing")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {T(
                      "مراقبة درجة الحرارة والرطوبة وجودة الهواء",
                      "Monitor temperature, humidity, and air quality"
                    )}
                  </p>
                </SpotlightCard>
                <SpotlightCard
                  className={`p-4 rounded-xl ${
                    isDark ? "bg-black" : "bg-white"
                  }`}
                  spotlightColor={
                    isDark ? "rgba(255, 255, 255, 0.25)" : "rgba(0, 0, 0, 0.25)"
                  }
                >
                  <Droplet className="text-primary h-8 w-8 mb-2" />
                  <h3 className="font-medium mb-1">
                    {T("إدارة المياه", "Water Management")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {T(
                      "التحكم الذكي في التدفق واستشعار الرطوبة",
                      "Smart flow control and moisture sensing"
                    )}
                  </p>
                </SpotlightCard>
                <SpotlightCard
                  className={`p-4 rounded-xl ${
                    isDark ? "bg-black" : "bg-white"
                  }`}
                  spotlightColor={
                    isDark ? "rgba(255, 255, 255, 0.25)" : "rgba(0, 0, 0, 0.25)"
                  }
                >
                  <Sun className="text-primary h-8 w-8 mb-2" />
                  <h3 className="font-medium mb-1">
                    {T("مراقبة الضوء", "Light Monitoring")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {T(
                      "اكتشاف الأشعة فوق البنفسجية وتحليل شدة الضوء",
                      "UV detection and light intensity analysis"
                    )}
                  </p>
                </SpotlightCard>
                <SpotlightCard
                  className={`p-4 rounded-xl ${
                    isDark ? "bg-black" : "bg-white"
                  }`}
                  spotlightColor={
                    isDark ? "rgba(255, 255, 255, 0.25)" : "rgba(0, 0, 0, 0.25)"
                  }
                >
                  <Leaf className="text-primary h-8 w-8 mb-2" />
                  <h3 className="font-medium mb-1">
                    {T("تحليل التربة", "Soil Analysis")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {T(
                      "اختبار NPK ومراقبة مستوى الحموضة",
                      "NPK testing and pH level monitoring"
                    )}
                  </p>
                </SpotlightCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ComponentsSection = () => {
  const T = useT();

  const componentsData = [
    {
      title: T("مستشعرات ", "Sensors"),
      description: T(
        "مستشعرات بيئيه متعدد المعايير يقيس الضغط ودرجة الحرارة والرطوبة ومستويات المركبات العضوية المتطايرة.",
        "Multi-parameter environmental sensors measuring pressure, temperature, humidity and VOC levels."
      ),
      feature: T("وظائف مدمجة 4 في 1", "Integrated 4-in-1 functionality"),
    },
    {
      title: T("مجموعة تحليل التربة", "Soil Analysis Suite"),
      description: T(
        "مراقبة شاملة للتربة تشمل الرطوبة، درجة الحرارة، مستوى الحموضة، ومستويات مغذيات NPK.",
        "Comprehensive soil monitoring including moisture, temperature, pH, and NPK nutrient levels."
      ),
      feature: T(
        "تحليلات زراعية بمستوى احترافي",
        "Professional-grade agricultural analytics"
      ),
    },
    {
      title: T("نظام إدارة الإضاءة", "Light Management System"),
      description: T(
        "اكتشاف الأشعة فوق البنفسجية ومراقبة شدة الضوء مع مصابيح نمو LED RGB لتحسين نمو النباتات.",
        "UV detection and light intensity monitoring with RGB LED grow lights for plant optimization."
      ),
      feature: T(
        "إضاءة تكيفية لنمو مثالي",
        "Adaptive lighting for optimal growth"
      ),
    },
    {
      title: T("وحدة المعالجة", "Processing Hub"),
      description: T(
        "ميكروكنترولر قوي مزود بإمكانية التكامل مع وحدات تحكم أخرى لتحقيق أتمتة سلسة.",
        "Powerful microcontroller with integration capability for seamless automation."
      ),
      feature: T(
        "حوسبة حافة مع استجابة في الوقت الفعلي",
        "Edge computing with real-time response"
      ),
    },
    {
      title: T("إدارة المياه", "Water Management"),
      description: T(
        "قياس دقيق لتدفق المياه مع المضخات والصمامات ونظام تبريد لتنظيم درجة الحرارة.",
        "Precision water flow measurement with pumps, valves and cooling system for temperature regulation."
      ),
      feature: T(
        "ري ذكي بتحكم فعال",
        "Smart irrigation with efficiency controls"
      ),
    },
    {
      title: T("المساعدة الروبوتية", "Robotic Assistance"),
      description: T(
        "نظام تلقائي لصيانة النباتات مزود بنظام رؤية بالكاميرا للمراقبة.",
        "Automated plant maintenance system with camera vision for monitoring."
      ),
      feature: T(
        "معالجة دقيقة بتغذية بصرية راجعة",
        "Precision handling with visual feedback"
      ),
    },
  ];

  return (
    <section dir={T("rtl", "ltr")} className="py-16 bg-accent/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {T("المكونات الأساسية للنظام", "Core System Components")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {T(
              "نظام الدفيئة الذكية لدينا يدمج أجهزة استشعار عالية الدقة ومكونات موثوقة لتهيئة البيئة المثلى لنمو النباتات.",
              "Our smart greenhouse system integrates high-precision sensors and reliable hardware to create the optimal growing environment for your plants."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {componentsData.map((comp, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">{comp.title}</h3>
              </div>
              <p className="text-muted-foreground mb-4">{comp.description}</p>
              <div className="flex items-center text-sm text-foreground/80">
                <Check className="w-4 h-4 mr-2 text-primary" />
                <span>{comp.feature}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureSection = () => {
  const T = useT();
  return (
    <section dir={T("rtl", "ltr")} className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">
            {T("الميزات الرئيسية للنظام", "Key System Features")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            {T(
              "يجمع نظام الدفيئة الذكية لدينا بين أحدث التقنيات والتصميم العملي لإدارة المحاصيل المثلى.",
              "Our smart greenhouse system combines cutting-edge technology with practical design for optimal crop management."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-background rounded-lg p-6 border border-border">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">
              {T("التحكم البيئي", "Environmental Control")}
            </h3>
            <p className="text-muted-foreground">
              {T(
                "مراقبة وتحكم دقيق بدرجة الحرارة، الرطوبة، جودة الهواء، والإضاءة لتحقيق ظروف نمو مثالية.",
                "Precise monitoring and control of temperature, humidity, air quality, and lighting for optimal growth conditions."
              )}
            </p>
          </div>

          <div className="bg-background rounded-lg p-6 border border-border">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Droplet className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">
              {T("إدارة الري", "Irrigation Management")}
            </h3>
            <p className="text-muted-foreground">
              {T(
                "توصيل ذكي للمياه مع مراقبة معدل التدفق واكتشاف رطوبة التربة لاستخدام فعال للموارد.",
                "Smart water delivery with flow rate monitoring and soil moisture detection for efficient resource usage."
              )}
            </p>
          </div>

          <div className="bg-background rounded-lg p-6 border border-border">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Sun className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">
              {T("إضاءة تكيفية", "Adaptive Lighting")}
            </h3>
            <p className="text-muted-foreground">
              {T(
                "اكتشاف الأشعة فوق البنفسجية وإضاءة إضافية RGB لضمان عملية التمثيل الضوئي المثلى وتطور النباتات.",
                "UV detection and supplemental RGB lighting to ensure optimal photosynthesis and plant development."
              )}
            </p>
          </div>

          <div className="bg-background rounded-lg p-6 border border-border">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">
              {T("تحليلات المغذيات", "Nutrient Analytics")}
            </h3>
            <p className="text-muted-foreground">
              {T(
                "مجسات NPK ودرجة الحموضة عالية الدقة لمراقبة شاملة لصحة التربة وإدارة الخصوبة.",
                "High-precision NPK and pH sensors for comprehensive soil health monitoring and fertility management."
              )}
            </p>
          </div>

          <div className="bg-background rounded-lg p-6 border border-border">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">
              {T("تشغيل مستدام", "Sustainable Operation")}
            </h3>
            <p className="text-muted-foreground">
              {T(
                "نظام يعمل بالطاقة الشمسية مع بطارية احتياطية لضمان تشغيل صديق للبيئة ومستمر.",
                "Solar-powered system with battery backup ensures environmentally-friendly and continuous operation."
              )}
            </p>
          </div>

          <div className="bg-background rounded-lg p-6 border border-border">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <ArrowUpRight className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">
              {T("المساعدة المؤتمتة", "Automated Assistance")}
            </h3>
            <p className="text-muted-foreground">
              {T(
                "ذراع روبوتية ونظام رؤية بالكاميرا لصيانة النباتات والمراقبة وجمع البيانات.",
                "Robotic arm and camera vision system for plant maintenance, monitoring, and data collection."
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const SystemArcSection = () => {
  const T = useT();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const controls = useAnimation();

  const data = [
    { name: T("المستشعرات البيئية", "Environmental Sensors"), value: 12 },
    { name: T("مجموعة تحليل التربة", "Soil Analysis Suite"), value: 65 },
    { name: T("المعالجة والتحكم", "Processing & Control"), value: 17 },
    { name: T("إدارة المياه", "Water Management"), value: 5 },
    { name: T("الإضاءة والرؤية", "Light & Vision"), value: 6 },
  ];

  if (inView) controls.start("visible");
  return (
    <section dir={T("rtl", "ltr")} className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">
              {T("هيكل النظام الذكي", "Intelligent System Architecture")}
            </h2>
            <p className="text-muted-foreground mb-6">
              {T(
                "يجمع نظام الدفيئة لدينا بين تقنيات استشعار متعددة ومعالجة متقدمة لتحقيق تحكم بيئي لا مثيل له.",
                "Our greenhouse system combines multiple sensing technologies with advanced computing for unparalleled environmental control."
              )}
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mt-1 bg-primary rounded-full p-1 mr-3">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-medium">
                    {T("تشغيل بالطاقة الشمسية", "Solar-Powered Operation")}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {T(
                      "لوحة شمسية بقدرة 18 فولت و30 واط مع بطارية ليثيوم احتياطية لتشغيل مستدام.",
                      "18V 30W solar panel with Li-ion battery backup for sustainable operation."
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mt-1 bg-primary rounded-full p-1 mr-3">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-medium">
                    {T("التصوير المتقدم", "Advanced Imaging")}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {T(
                      "كاميرا Sony IMX219 بدقة 8 ميجابكسل مع رؤية ليلية لمراقبة على مدار الساعة.",
                      "Sony IMX219 8-Megapixel camera with night vision for 24/7 monitoring."
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mt-1 bg-primary rounded-full p-1 mr-3">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-medium">
                    {T("إدارة الحرارة", "Thermal Management")}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {T(
                      "تبريد نشط باستخدام مراوح بتحكم حراري ونظام تبريد مائي.",
                      "Active cooling with temperature-controlled fans and water cooling system."
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mt-1 bg-primary rounded-full p-1 mr-3">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-medium">
                    {T("أتمتة المرحلات", "Relay Automation")}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {T(
                      "تحكم في المرحلات متعددة القنوات لضبط توقيت جميع أنظمة الدفيئة بدقة.",
                      "Multi-channel relay control for precise timing of all greenhouse systems."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="bg-muted p-6 rounded-lg border border-border">
              <h3 className="font-medium mb-4 text-center">
                {T("تفصيل مكونات النظام", "System Component Breakdown")}
              </h3>
              <div ref={ref} className="space-y-3">
                {data.map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{item.name}</span>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                    <div className="w-full bg-accent rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="bg-primary h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={controls}
                        variants={{
                          visible: { width: `${item.value}%` },
                        }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CallToAction = () => {
  const { auth } = useAuth();
  const T = useT();
  return (
    <section dir={T("rtl", "ltr")} className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-accent rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {T(
                "هل أنت مستعد لإحداث ثورة في دفيئتك؟",
                "Ready to revolutionize your greenhouse?"
              )}
            </h2>
            <p className="text-muted-foreground">
              {T(
                "ابدأ مع نظام المراقبة الذكي الكامل لدينا للحصول على إنتاجية أفضل للمحاصيل وكفاءة أعلى في الموارد.",
                "Get started with our complete smart greenhouse monitoring system for enhanced crop yields and resource efficiency."
              )}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to={auth ? "/dashboard/charts" : "/signIn"}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              {T("ابدأ الآن", "Get Started")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default LandingPage;

import { useT } from "@/hooks/LangContext";
export const Cards = () => {
  const T = useT();
  return [
    {
      title: T("مكونات الدفيئة الذكية", "Smart Greenhouse Components"),
      image: "/bme680.webp",
      description: T(
        "BME680 هو مستشعر بيئي متكامل يجمع بين قياسات متعددة في حزمة واحدة مدمجة:",
        "The BME680 is an integrated environmental sensor that combines multiple measurements in one compact package:"
      ),
      List: (
        <>
          <li>
            {T(
              "استشعار درجة الحرارة بدقة ±1 درجة مئوية",
              "Temperature sensing with ±1°C accuracy"
            )}
          </li>
          <li>
            {T(
              "قياس الرطوبة بدقة ±3%",
              "Humidity measurement with ±3% accuracy"
            )}
          </li>
          <li>
            {T(
              "الضغط الجوي بدقة مطلقة ±1 هكتوباسكال",
              "Barometric pressure with ±1 hPa absolute accuracy"
            )}
          </li>
          <li>
            {T(
              "مستشعر الغاز لتقييم جودة الهواء الداخلي (VOC)",
              "Gas sensor for indoor air quality assessment (VOC)"
            )}
          </li>
        </>
      ),
      scientificPrinciple: T(
        `يستخدم تقنيات الامتصاص المقاوم والسعوي والأشعة تحت الحمراء لقياس معايير بيئية مختلفة، مما يتيح التحكم الدقيق في المناخ المحلي في بيئات البيوت الزجاجية.`,
        `Utilizes resistive, capacitive and infrared absorption techniques to measure different environmental parameters, enabling precise microclimate control in greenhouse environments.`
      ),
    },
    {
      title: T("مستشعر رطوبة التربة السعوي", "Capacitive Soil Moisture Sensor"),
      image: "/capacitivemoisture.webp",
      description: T(
        "يوفر مستشعر رطوبة التربة السعوي قياسات دقيقة لمحتوى الماء في التربة دون مشاكل تآكل الأقطاب الموجودة في المستشعرات المقاومة.",
        "This capacitive soil moisture sensor provides accurate measurements of soil water content without electrode corrosion issues found in resistive sensors."
      ),
      List: (
        <>
          <li>
            {T("تقنية قياس غير جراحية", "Non-invasive measurement technique")}
          </li>
          <li>
            {T(
              "عمر أطول من البدائل المقاومة",
              "Longer lifespan than resistive alternatives"
            )}
          </li>
          <li>
            {T(
              "إشارة خرج تناسبية مع محتوى الرطوبة",
              "Analog output signal proportional to moisture content"
            )}
          </li>
        </>
      ),
      scientificPrinciple: T(
        `يقيس السماحية الكهربائية للتربة، والتي تتغير مع محتوى الماء. يشكل المستشعر مكثفًا مع التربة كوسط عازل، مما يسمح بقياس دقيق لمستويات الرطوبة للتحكم الأمثل في الري.`,
        `Measures the dielectric permittivity of soil, which changes with water content. The sensor forms a capacitor with soil as the dielectric medium, allowing precise measurement of moisture levels for optimal irrigation control.`
      ),
    },
    {
      title: T(
        "مستشعر الأشعة فوق البنفسجية GUVA-S12SD",
        "GUVA-S12SD UV Sensor"
      ),
      image: "/guvas12sd.webp",
      description: T(
        "يكتشف مستشعر GUVA-S12SD مستويات الأشعة فوق البنفسجية، وهو أمر ضروري لمراقبة التعرض للأشعة فوق البنفسجية للنباتات في بيئات البيوت الزجاجية.",
        "The GUVA-S12SD sensor detects ultraviolet radiation levels, essential for monitoring UV exposure for plants in greenhouse environments."
      ),
      List: (
        <>
          <li>{T("يقيس إشعاع UVA وUVB", "Measures UVA and UVB radiation")}</li>
          <li>
            {T("نطاق طيفي من 240-370 نانومتر", "Spectral range of 240-370nm")}
          </li>
          <li>
            {T(
              "خرج جهد تناسبي مع شدة الأشعة فوق البنفسجية",
              "Analog voltage output proportional to UV intensity"
            )}
          </li>
        </>
      ),
      scientificPrinciple: T(
        `يستخدم مزيجًا من الثنائي الضوئي والمرشح للكشف الانتقائي عن أطوال موجات الأشعة فوق البنفسجية. يسمح هذا بمراقبة التعرض للأشعة فوق البنفسجية، وهو أمر بالغ الأهمية لتنظيم التمثيل الضوئي وتطور النبات في البيئات الخاضعة للرقابة.`,
        `Uses a photodiode and filter combination to selectively detect UV wavelengths. This allows monitoring of UV exposure, which is crucial for photosynthesis regulation and plant development in controlled environments.`
      ),
    },
    {
      title: T(
        "مستشعر شدة الضوء BH1750FVI",
        "BH1750FVI Light Intensity Sensor"
      ),
      image: "/bh1750fvi.webp",
      description: T(
        "BH1750FVI هو مستشعر رقمي لشدة الضوء بدقة عالية ونطاق قياس واسع، مثالي للتحكم في ظروف الإضاءة في البيوت الزجاجية.",
        "The BH1750FVI is a digital light intensity sensor with high precision and wide measurement range, ideal for controlling lighting conditions in greenhouses."
      ),
      List: (
        <>
          <li>
            {T(
              "قياس واسع النطاق من 1-65535 لوكس",
              "Wide range measurement from 1-65535 lux"
            )}
          </li>
          <li>
            {T(
              "واجهة رقمية I²C للقراءات الموثوقة",
              "I²C digital interface for reliable readings"
            )}
          </li>
          <li>
            {T(
              "استجابة طيفية مشابهة لإدراك العين البشرية",
              "Spectral response similar to human eye perception"
            )}
          </li>
        </>
      ),
      scientificPrinciple: T(
        `يحول شدة الضوء إلى إشارة رقمية باستخدام ثنائي ضوئي باستجابة طيفية قريبة من العين البشرية. هذا يسمح بقياس دقيق لمستويات الإشعاع الضوئي النشط ضوئيًا (PAR) للنمو الأمثل للنباتات.`,
        `Converts light intensity to a digital signal using a photodiode with a spectral response close to that of the human eye. This allows for precise measurement of photosynthetically active radiation (PAR) levels for optimal plant growth.`
      ),
    },
    {
      title: T(
        "مستشعر درجة حرارة التربة DS18B20",
        "DS18B20 Soil Temperature Sensor"
      ),
      image: "/ds18b20.webp",
      description: T(
        "DS18B20 هو مستشعر درجة حرارة رقمي مقاوم للماء مصمم لمراقبة درجة حرارة التربة والماء في بيئات البيوت الزجاجية.",
        "The DS18B20 is a waterproof digital temperature sensor designed for soil and water temperature monitoring in greenhouse environments."
      ),
      List: (
        <>
          <li>
            {T(
              "يقيس درجات الحرارة من -55°C إلى +125°C",
              "Measures temperatures from -55°C to +125°C"
            )}
          </li>
          <li>
            {T(
              "دقة ±0.5°C من -10°C إلى +85°C",
              "±0.5°C accuracy from -10°C to +85°C"
            )}
          </li>
          <li>
            {T(
              "واجهة 1-Wire فريدة تسمح بعدة مستشعرات على خط بيانات واحد",
              "Unique 1-Wire interface allowing multiple sensors on one data line"
            )}
          </li>
        </>
      ),
      scientificPrinciple: T(
        `يستخدم عنصر استشعار درجة الحرارة القائم على أشباه الموصلات الذي يغير المقاومة مع درجة الحرارة. هذا يسمح بمراقبة درجة حرارة التربة، والتي تؤثر مباشرة على تطور الجذور وامتصاص المغذيات والنشاط الميكروبي.`,
        `Uses a semiconductor-based temperature sensing element that changes resistance with temperature. This allows monitoring of soil temperature, which directly affects root development, nutrient uptake, and microbial activity.`
      ),
    },
    {
      title: T("مستشعر معدل التدفق YF-S401", "YF-S401 Flow Rate Sensor"),
      image: "/yfs401.webp",
      description: T(
        "YF-S401 هو مستشعر تدفق المياه الذي يقيس حجم المياه التي تمر عبر أنظمة الري في البيت الزجاجي.",
        "The YF-S401 is a water flow sensor that measures the volume of water passing through irrigation systems in the greenhouse."
      ),
      List: (
        <>
          <li>
            {T("تقنية استشعار تأثير هول", "Hall effect sensing technology")}
          </li>
          <li>
            {T(
              "إخراج إشارة نبضية تناسبية مع معدل التدفق",
              "Outputs pulse signal proportional to flow rate"
            )}
          </li>
          <li>
            {T(
              "نطاق معدل التدفق العامل: 1-30 لتر/دقيقة",
              "Working flow rate range: 1-30L/min"
            )}
          </li>
        </>
      ),
      scientificPrinciple: T(
        `يستخدم دولاب دوار مع مغناطيس مضمن يدور مع تدفق المياه، مما يولد نبضات عبر مستشعر تأثير هول. هذا يسمح بقياس دقيق لاستهلاك مياه الري ويساعد في تحسين استهلاك المياه.`,
        `Uses a pinwheel with embedded magnet that rotates with water flow, generating pulses via Hall effect sensor. This allows precise measurement of irrigation water usage and helps optimize water consumption.`
      ),
    },
    {
      title: T("وحدة تحكم Raspberry Pi 5", "Raspberry Pi 5 Microcontroller"),
      image: "/rasberrypi.webp",
      description: T(
        "يعمل Raspberry Pi 5 كالدماغ المركزي لنظام البيت الزجاجي الذكي، حيث يقوم بمعالجة بيانات المستشعر والتحكم في المكونات المختلفة.",
        "The Raspberry Pi 5 serves as the central brain of the smart greenhouse system, processing sensor data and controlling various components."
      ),
      List: (
        <>
          <li>{T("معالج رباعي النواة قوي", "Powerful quad-core processor")}</li>
          <li>
            {T(
              "خيارات متعددة للإدخال/الإخراج (GPIO، I²C، SPI)",
              "Multiple I/O options (GPIO, I²C, SPI)"
            )}
          </li>
          <li>
            {T(
              "اتصال بالشبكة للرصد عن بعد",
              "Network connectivity for remote monitoring"
            )}
          </li>
          <li>
            {T(
              "يعمل بأنظمة تشغيل تعتمد على لينكس",
              "Runs Linux-based operating systems"
            )}
          </li>
        </>
      ),
      scientificPrinciple: T(
        `يعمل كنظام حوسبة مضمن ينفذ خوارزميات التحكم بناءً على حلقات التغذية الراجعة البيئية. هذا يتيح اتخاذ القرارات الآلية لظروف النمو المثلى.`,
        `Operates as an embedded computing system that implements control algorithms based on environmental feedback loops. This enables automated decision-making for optimal growing conditions.`
      ),
    },
    {
      title: T(
        "كاميرا Sony IMX219 8 ميجابكسل",
        "Sony IMX219 8-Megapixel Camera"
      ),
      image: "/b010311.webp",
      description: T(
        "تتيح وحدة كاميرا Sony IMX219 المراقبة البصرية وتطبيقات الرؤية الحاسوبية لنظام البيت الزجاجي.",
        "The Sony IMX219 camera module enables visual monitoring and computer vision applications for the greenhouse system."
      ),
      List: (
        <>
          <li>
            {T(
              "دقة 8 ميجابكسل لتصوير النباتات التفصيلي",
              "8-megapixel resolution for detailed plant imaging"
            )}
          </li>
          <li>
            {T(
              "متوافق مع موصل Raspberry Pi CSI",
              "Compatible with Raspberry Pi CSI connector"
            )}
          </li>
          <li>
            {T(
              "دعم لتنسيقات الصور والفيديو المختلفة",
              "Support for various image and video formats"
            )}
          </li>
        </>
      ),
      scientificPrinciple: T(
        `يلتقط الضوء المرئي في طيف RGB، مما يتيح تحليل نمو النبات، واكتشاف الأمراض، والتصنيف الظاهري من خلال خوارزميات الرؤية الحاسوبية وتقنيات معالجة الصور.`,
        `Captures visual light in RGB spectrum, enabling plant growth analysis, disease detection, and phenotyping through computer vision algorithms and image processing techniques.`
      ),
    },
    {
      title: T(
        "مصابيح الأشعة تحت الحمراء للرؤية الليلية",
        "Night Vision Infrared IR LEDs"
      ),
      image: "/nightvisionleds.webp",
      description: T(
        "تمكن مصابيح الأشعة تحت الحمراء من مراقبة ظروف البيت الزجاجي على مدار 24 ساعة حتى في الظلام التام.",
        "Infrared LEDs enable 24/7 monitoring of greenhouse conditions even in complete darkness."
      ),
      List: (
        <>
          <li>
            {T(
              "إضاءة بالأشعة تحت الحمراء بطول موجة 850 نانومتر",
              "850nm wavelength IR illumination"
            )}
          </li>
          <li>
            {T(
              "غير مرئية للعين البشرية ولكن مرئية لمستشعرات الكاميرا",
              "Invisible to human eye but visible to camera sensors"
            )}
          </li>
          <li>{T("استهلاك منخفض للطاقة", "Low power consumption")}</li>
        </>
      ),
      scientificPrinciple: T(
        `ينبعث إشعاع الأشعة تحت الحمراء غير المرئي للعين البشرية ولكنه قابل للكشف بواسطة مستشعرات الكاميرا. هذا يسمح بالمراقبة المستمرة دون تعطيل فترات الضوء النباتية أو إيقاعاتها اليومية.`,
        `Emits infrared radiation that's invisible to human eyes but detectable by camera sensors. This allows continuous monitoring without disrupting plant photoperiods or circadian rhythms.`
      ),
    },
    {
      title: T("مراوح التبريد", "Cooling Fans"),
      image: "/fans.webp",
      description: T(
        "تساعد مراوح التبريد على تنظيم درجة الحرارة وتحسين دوران الهواء داخل بيئة البيت الزجاجي.",
        "Cooling fans help regulate temperature and improve air circulation within the greenhouse environment."
      ),
      List: (
        <>
          <li>
            {T(
              "تعمل بالتيار المستمر لكفاءة الطاقة",
              "DC powered for energy efficiency"
            )}
          </li>
          <li>
            {T(
              "قابلة للتحكم في السرعة عبر PWM",
              "Speed-controllable through PWM"
            )}
          </li>
          <li>
            {T(
              "نمط تدفق هواء محسن للتوزيع المتساوي",
              "Optimized airflow pattern for even distribution"
            )}
          </li>
        </>
      ),
      scientificPrinciple: T(
        `يخلق حمل حراري قسري يزيد من كفاءة تبادل الحرارة وتوزيع ثاني أكسيد الكربون. هذا يمنع النقاط الساخنة، ويقلل من تدرجات الرطوبة، ويحسن معدلات النتح.`,
        `Creates forced convection that increases heat exchange efficiency and CO₂ distribution. This prevents hotspots, reduces humidity gradients, and improves transpiration rates.`
      ),
    },
    {
      title: T("مصابيح LED RGB WS2812", "WS2812 RGB LEDs"),
      image: "/rgbleds.webp",
      description: T(
        "توفر مصابيح WS2812 RGB LED إضاءة قابلة للبرمجة لتحسين نمو النبات والمؤشرات البصرية.",
        "WS2812 RGB LEDs provide programmable lighting for plant growth optimization and visual indicators."
      ),
      List: (
        <>
          <li>
            {T(
              "بكسلات RGB قابلة للعنونة بشكل فردي",
              "Individually addressable RGB pixels"
            )}
          </li>
          <li>{T("دوائر سائق متكاملة", "Integrated driver circuitry")}</li>
          <li>
            {T(
              "خرج طيف ضوئي قابل للتخصيص",
              "Customizable light spectrum output"
            )}
          </li>
        </>
      ),
      scientificPrinciple: T(
        `ينبعث أطوال موجية محددة من الضوء التي يمكن ضبطها لتحسين كفاءة التمثيل الضوئي وشكل النبات. تؤثر أطياف الضوء المختلفة على أنماط النمو والإزهار والإثمار.`,
        `Emits specific wavelengths of light that can be tuned to optimize photosynthesis efficiency and plant morphology. Different light spectra influence growth patterns, flowering, and fruiting.`
      ),
    },
    {
      title: T("نظام التبريد بالماء", "Water Cooling System"),
      image: "/coolingcup.webp",
      description: T(
        "يوفر نظام التبريد بالماء مع غرفة التبريد إدارة حرارية فعالة للمكونات الإلكترونية ويساعد على تنظيم درجة حرارة البيت الزجاجي.",
        "The water cooling system with heat sink provides efficient thermal management for electronic components and helps regulate greenhouse temperature."
      ),
      List: (
        <>
          <li>
            {T(
              "تصميم تبريد سائل حلقة مغلقة",
              "Closed-loop liquid cooling design"
            )}
          </li>
          <li>
            {T(
              "مواد عالية التوصيل الحراري",
              "High thermal conductivity materials"
            )}
          </li>
          <li>
            {T(
              "يمكن دمجه مع نظام التحكم في درجة الحرارة",
              "Can be integrated with temperature control system"
            )}
          </li>
        </>
      ),
      scientificPrinciple: T(
        `يستخدم السعة الحرارية العالية للماء لامتصاص ونقل الطاقة الحرارية بكفاءة. هذا يسمح بتحكم أكثر دقة في درجة الحرارة من التبريد بالهواء وحده.`,
        `Utilizes water's high specific heat capacity to absorb and transfer thermal energy efficiently. This allows for more precise temperature control than air cooling alone.`
      ),
    },
    {
      title: T("مضخات المياه", "Water Pumps"),
      image: "/pumps.webp",
      description: T(
        "تقوم مضخات المياه بتشغيل أنظمة الري والتبريد، وتدوير المياه عبر إعداد البيت الزجاجي.",
        "Water pumps drive the irrigation and cooling systems, circulating water through the greenhouse setup."
      ),
      List: (
        <>
          <li>
            {T(
              "تصميم مغمور للتشغيل الهادئ",
              "Submersible design for quiet operation"
            )}
          </li>
          <li>{T("قدرة معدل تدفق متغيرة", "Variable flow rate capability")}</li>
          <li>{T("استهلاك منخفض للطاقة", "Low power consumption")}</li>
        </>
      ),
      scientificPrinciple: T(
        `يحول الطاقة الكهربائية إلى طاقة حركية، مما يخلق فرق ضغط يدفع تدفق المياه. هذا يتيح توصيل المياه بدقة إلى جذور النباتات وأنظمة التبريد.`,
        `Converts electrical energy to kinetic energy, creating pressure differential that drives water flow. This enables precise water delivery to plant roots and cooling systems.`
      ),
    },
    {
      title: T("لوحة شمسية (18V 30W)", "Solar Panel (18V 30W)"),
      image: "/solarpannel.webp",
      description: T(
        "توفر اللوحة الشمسية طاقة متجددة لتشغيل أنظمة مراقبة والتحكم في البيت الزجاجي.",
        "The solar panel provides renewable energy to power the greenhouse monitoring and control systems."
      ),
      List: (
        <>
          <li>
            {T(
              "إخراج طاقة 30 واط عند ذروة الكفاءة",
              "30W power output at peak efficiency"
            )}
          </li>
          <li>
            {T(
              "سيليكون أحادي البلورية لكفاءة أعلى",
              "Monocrystalline silicon for higher efficiency"
            )}
          </li>
          <li>{T("بناء مقاوم للعوامل الجوية", "Weatherproof construction")}</li>
        </>
      ),
      scientificPrinciple: T(
        `يحول الطاقة الضوئية إلى طاقة كهربائية من خلال التأثير الكهروضوئي. تولد المواد شبه الموصلة تدفق إلكتروني عند تعرضها للفوتونات، مما يخلق طاقة مستدامة لنظام البيت الزجاجي.`,
        `Converts light energy into electrical energy through photovoltaic effect. Semiconductor materials generate electron flow when exposed to photons, creating sustainable power for the greenhouse system.`
      ),
    },
    {
      title: T(
        "بطاريات ليثيوم أيون قابلة للشحن",
        "Li-ion Rechargeable Batteries"
      ),
      image: "/buttaries.webp",
      description: T(
        "تخزن بطاريات 18650 ليثيوم أيون الطاقة من الألواح الشمسية للتشغيل المستمر أثناء الليل أو الظروف الغائمة.",
        "18650 Li-ion batteries store energy from solar panels for continuous operation during nighttime or cloudy conditions."
      ),
      List: (
        <>
          <li>{T("جهد اسمي 3.7 فولت", "3.7V nominal voltage")}</li>
          <li>
            {T(
              "سعة 1000 مللي أمبير ساعة لكل خلية",
              "1000mAh capacity per cell"
            )}
          </li>
          <li>
            {T(
              "قابلة للشحن للتشغيل المستدام",
              "Rechargeable for sustainable operation"
            )}
          </li>
        </>
      ),
      scientificPrinciple: T(
        `يستخدم تداخل أيونات الليثيوم في مواد الأقطاب الكهربائية لتخزين وإطلاق الطاقة الكهربائية. هذا يخلق عازل طاقة يضمن موثوقية النظام على الرغم من مدخلات الطاقة الشمسية المتغيرة.`,
        `Utilizes lithium ion intercalation in electrode materials to store and release electrical energy. This creates an energy buffer that ensures system reliability despite variable solar input.`
      ),
    },
    {
      title: T("وحدات الترحيل", "Relay Modules"),
      image: "/relays.webp",
      description: T(
        "تسمح وحدات الترحيل 8 قنوات بوحدات التحكم الدقيقة بتبديل الأجهزة عالية الطاقة مثل المضخات والصمامات والمراوح.",
        "8-channel relay modules allow microcontrollers to switch high-power devices like pumps, valves, and fans."
      ),
      List: (
        <>
          <li>
            {T(
              "مدخلات معزولة بصريًا للسلامة",
              "Optically isolated inputs for safety"
            )}
          </li>
          <li>
            {T(
              "يتحكم في أحمال التيار المتردد والتيار المستمر",
              "Controls AC and DC loads"
            )}
          </li>
          <li>{T("مؤشرات حالة LED", "LED status indicators")}</li>
        </>
      ),
      scientificPrinciple: T(
        `يستخدم الحث الكهرومغناطيسي لفصل دوائر التحكم عن دوائر الطاقة فعليًا. هذا يسمح لوحدات التحكم الدقيقة منخفضة الجهد بالتحكم في الأجهزة عالية الطاقة بأمان.`,
        `Uses electromagnetic induction to physically separate control circuits from power circuits. This allows low-voltage microcontrollers to safely control high-power devices.`
      ),
    },
    {
      title: T("ذراع روبوت", "Robot Arm"),
      image: "/arm.webp",
      description: T(
        "يتيح الذراع الروبوتي الأكريليك التفاعلات المادية الآلية مع النباتات لمهام مثل التقليم والتلقيح أو جمع العينات.",
        "The acrylic robot arm enables automated physical interactions with plants for tasks like pruning, pollination, or sample collection."
      ),
      List: (
        <>
          <li>
            {T(
              "درجات متعددة من الحرية للحركات المعقدة",
              "Multiple degrees of freedom for complex movements"
            )}
          </li>
          <li>
            {T(
              "مفاصل متحكم بها بمحركات سيرفو",
              "Servo motor-controlled joints"
            )}
          </li>
          <li>
            {T(
              "قابل للبرمجة للمهام المتكررة",
              "Programmable for repetitive tasks"
            )}
          </li>
        </>
      ),
      scientificPrinciple: T(
        `يستخدم سلاسل حركية ومفاصل مدفوعة بالسيرفو لترجمة التعليمات الخوارزمية إلى حركات فيزيائية دقيقة. هذا يتيح أتمتة المهام التي تتطلب تدخلًا بشريًا لولا ذلك.`,
        `Uses kinematic chains and servo-driven joints to translate algorithmic instructions into precise physical movements. This enables automation of tasks that would otherwise require human intervention.`
      ),
    },
    {
      title: T("Arduino Uno", "Arduino Uno"),
      image: "/arduino.webp",
      description: T(
        "تتعامل وحدات تحكم Arduino Uno مع استشعار ومراقبة الوقت الحقيقي، وتعمل جنبًا إلى جنب مع Raspberry Pi.",
        "Arduino Uno microcontrollers handle real-time sensing and control tasks, working alongside the Raspberry Pi."
      ),
      List: (
        <>
          <li>
            {T("وحدة تحكم دقيقة ATmega328P", "ATmega328P microcontroller")}
          </li>
          <li>
            {T(
              "14 دبوس إدخال/إخراج رقمي و6 مداخل تناظرية",
              "14 digital I/O pins and 6 analog inputs"
            )}
          </li>
          <li>
            {T(
              "قدرات معالجة في الوقت الحقيقي",
              "Real-time processing capabilities"
            )}
          </li>
        </>
      ),
      scientificPrinciple: T(
        `يستخدم بنية متحكم دقيق للمعالجة الحتمية في الوقت الحقيقي لبيانات المستشعر والتحكم في المشغلات. يوفر هذا عمليات حرجة التوقيت الموثوقة الضرورية للتحكم البيئي.`,
        `Utilizes a microcontroller architecture for deterministic, real-time processing of sensor data and actuator control. This provides reliable timing-critical operations essential for environmental control.`
      ),
    },
    {
      title: T(
        "مستشعر درجة الحموضة LSPH01 للتربة والماء",
        "LSPH01 Soil & Water PH Sensor"
      ),
      image: "/phsensor.webp",
      description: T(
        "يقيس مستشعر LSPH01 مستويات درجة الحموضة في التربة ومياه الري، وهو أمر بالغ الأهمية لتوافر المغذيات وصحة النبات.",
        "The LSPH01 measures pH levels in soil and irrigation water, critical for nutrient availability and plant health."
      ),
      List: (
        <>
          <li>
            {T(
              "نطاق قياس درجة الحموضة واسع (0-14)",
              "Wide pH measurement range (0-14)"
            )}
          </li>
          <li>
            {T(
              "تعويض متكامل لدرجة الحرارة",
              "Integrated temperature compensation"
            )}
          </li>
          <li>
            {T(
              "تصميم مقاوم للماء لتطبيقات التربة والماء",
              "Waterproof design for soil and water applications"
            )}
          </li>
        </>
      ),
      scientificPrinciple: T(
        `يستخدم قطبًا زجاجيًا يطور جهدًا كهربائيًا يتناسب مع تركيز أيون الهيدروجين. يسمح هذا بمراقبة حموضة/قلوية التربة، والتي تؤثر مباشرة على توافر المغذيات للنباتات.`,
        `Uses a glass electrode that develops an electrical potential proportional to hydrogen ion concentration. This allows monitoring of soil acidity/alkalinity, which directly affects nutrient availability to plants.`
      ),
    },
    {
      title: T(
        "مستشعر خصوبة التربة RS-NPK-N01-TR",
        "RS-NPK-N01-TR Fertility Sensor"
      ),
      image: "/rsnpkn01tr.webp",
      description: T(
        "يقيس هذا المستشعر المتخصص مستويات مغذيات التربة من النيتروجين (N) والفوسفور (P) والبوتاسيوم (K)، وهي المغذيات الكلية الأساسية الثلاثة لنمو النبات.",
        "This specialized sensor measures soil nutrient levels of Nitrogen (N), Phosphorus (P), and Potassium (K), the three primary macronutrients for plant growth."
      ),
      List: (
        <>
          <li>
            {T(
              "واجهة اتصال رقمية RS485",
              "RS485 digital communication interface"
            )}
          </li>
          <li>
            {T(
              "قياس متزامن لمستويات N و P و K",
              "Simultaneous measurement of N, P, and K levels"
            )}
          </li>
          <li>
            {T(
              "تركيب مدفون للتلامس المباشر مع التربة",
              "Buried installation for direct soil contact"
            )}
          </li>
        </>
      ),
      scientificPrinciple: T(
        `يستخدم أقطابًا انتقائية للأيونات أو تقنيات طيفية لقياس تركيزات أيونات المغذيات في محلول التربة. هذا يتيح التسميد الدقيق بناءً على حالة المغذيات الفعلية للتربة.`,
        `Uses ion-selective electrodes or spectroscopic techniques to measure nutrient ion concentrations in soil solution. This enables precise fertilization based on actual soil nutrient status.`
      ),
    },
  ];
};

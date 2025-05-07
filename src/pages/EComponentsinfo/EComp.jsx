import React, { useState } from "react";
import { Sun, Moon } from "lucide-react";

const EComp = () => {
  return (
    <div className={`min-h-screen`}>
      <div className="bg-background text-foreground min-h-screen transition-colors duration-300">
        <h1 className="text-2xl font-bold text-primary">
          Smart Greenhouse Components
        </h1>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* BME680 */}
            <div className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-accent p-4">
                <h2 className="text-xl font-semibold text-accent-foreground">
                  BME680 Environmental Sensor
                </h2>
              </div>
              <div className="p-6">
                <img
                  src="/bme680.webp"
                  alt="BME680 Sensor"
                  className="w-full h-48 object-contain mb-4"
                />
                <p className="text-card-foreground mb-4">
                  The BME680 is an integrated environmental sensor that combines
                  multiple measurements in one compact package:
                </p>
                <ul className="list-disc pl-5 mb-4 text-card-foreground">
                  <li>Temperature sensing with ±1°C accuracy</li>
                  <li>Humidity measurement with ±3% accuracy</li>
                  <li>Barometric pressure with ±1 hPa absolute accuracy</li>
                  <li>Gas sensor for indoor air quality assessment (VOC)</li>
                </ul>
                <p className="text-muted-foreground text-sm">
                  <strong>Scientific principle:</strong> Utilizes resistive,
                  capacitive and infrared absorption techniques to measure
                  different environmental parameters, enabling precise
                  microclimate control in greenhouse environments.
                </p>
              </div>
            </div>

            {/* Soil Moisture Sensor */}
            <div className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-accent p-4">
                <h2 className="text-xl font-semibold text-accent-foreground">
                  Capacitive Soil Moisture Sensor
                </h2>
              </div>
              <div className="p-6">
                <img
                  src="/capacitivemoisture.webp"
                  alt="Soil Moisture Sensor"
                  className="w-full h-48 object-contain mb-4"
                />
                <p className="text-card-foreground mb-4">
                  This capacitive soil moisture sensor provides accurate
                  measurements of soil water content without electrode corrosion
                  issues found in resistive sensors.
                </p>
                <ul className="list-disc pl-5 mb-4 text-card-foreground">
                  <li>Non-invasive measurement technique</li>
                  <li>Longer lifespan than resistive alternatives</li>
                  <li>Analog output signal proportional to moisture content</li>
                </ul>
                <p className="text-muted-foreground text-sm">
                  <strong>Scientific principle:</strong> Measures the dielectric
                  permittivity of soil, which changes with water content. The
                  sensor forms a capacitor with soil as the dielectric medium,
                  allowing precise measurement of moisture levels for optimal
                  irrigation control.
                </p>
              </div>
            </div>

            {/* UV Sensor */}
            <div className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-accent p-4">
                <h2 className="text-xl font-semibold text-accent-foreground">
                  GUVA-S12SD UV Sensor
                </h2>
              </div>
              <div className="p-6">
                <img
                  src="/guvas12sd.webp"
                  alt="UV Sensor"
                  className="w-full h-48 object-contain mb-4"
                />
                <p className="text-card-foreground mb-4">
                  The GUVA-S12SD sensor detects ultraviolet radiation levels,
                  essential for monitoring UV exposure for plants in greenhouse
                  environments.
                </p>
                <ul className="list-disc pl-5 mb-4 text-card-foreground">
                  <li>Measures UVA and UVB radiation</li>
                  <li>Spectral range of 240-370nm</li>
                  <li>Analog voltage output proportional to UV intensity</li>
                </ul>
                <p className="text-muted-foreground text-sm">
                  <strong>Scientific principle:</strong> Uses a photodiode and
                  filter combination to selectively detect UV wavelengths. This
                  allows monitoring of UV exposure, which is crucial for
                  photosynthesis regulation and plant development in controlled
                  environments.
                </p>
              </div>
            </div>

            {/* Light Intensity Sensor */}
            <div className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-accent p-4">
                <h2 className="text-xl font-semibold text-accent-foreground">
                  BH1750FVI Light Intensity Sensor
                </h2>
              </div>
              <div className="p-6">
                <img
                  src="/bh1750fvi.webp"
                  alt="Light Intensity Sensor"
                  className="w-full h-48 object-contain mb-4"
                />
                <p className="text-card-foreground mb-4">
                  The BH1750FVI is a digital light intensity sensor with high
                  precision and wide measurement range, ideal for controlling
                  lighting conditions in greenhouses.
                </p>
                <ul className="list-disc pl-5 mb-4 text-card-foreground">
                  <li>Wide range measurement from 1-65535 lux</li>
                  <li>I²C digital interface for reliable readings</li>
                  <li>Spectral response similar to human eye perception</li>
                </ul>
                <p className="text-muted-foreground text-sm">
                  <strong>Scientific principle:</strong> Converts light
                  intensity to a digital signal using a photodiode with a
                  spectral response close to that of the human eye. This allows
                  for precise measurement of photosynthetically active radiation
                  (PAR) levels for optimal plant growth.
                </p>
              </div>
            </div>

            {/* Soil Temperature Sensor */}
            <div className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-accent p-4">
                <h2 className="text-xl font-semibold text-accent-foreground">
                  DS18B20 Soil Temperature Sensor
                </h2>
              </div>
              <div className="p-6">
                <img
                  src="/ds18b20.webp"
                  alt="Soil Temperature Sensor"
                  className="w-full h-48 object-contain mb-4"
                />
                <p className="text-card-foreground mb-4">
                  The DS18B20 is a waterproof digital temperature sensor
                  designed for soil and water temperature monitoring in
                  greenhouse environments.
                </p>
                <ul className="list-disc pl-5 mb-4 text-card-foreground">
                  <li>Measures temperatures from -55°C to +125°C</li>
                  <li>±0.5°C accuracy from -10°C to +85°C</li>
                  <li>
                    Unique 1-Wire interface allowing multiple sensors on one
                    data line
                  </li>
                </ul>
                <p className="text-muted-foreground text-sm">
                  <strong>Scientific principle:</strong> Uses a
                  semiconductor-based temperature sensing element that changes
                  resistance with temperature. This allows monitoring of soil
                  temperature, which directly affects root development, nutrient
                  uptake, and microbial activity.
                </p>
              </div>
            </div>

            {/* Flow Rate Sensor */}
            <div className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-accent p-4">
                <h2 className="text-xl font-semibold text-accent-foreground">
                  YF-S401 Flow Rate Sensor
                </h2>
              </div>
              <div className="p-6">
                <img
                  src="/yfs401.webp"
                  alt="Flow Rate Sensor"
                  className="w-full h-48 object-contain mb-4"
                />
                <p className="text-card-foreground mb-4">
                  The YF-S401 is a water flow sensor that measures the volume of
                  water passing through irrigation systems in the greenhouse.
                </p>
                <ul className="list-disc pl-5 mb-4 text-card-foreground">
                  <li>Hall effect sensing technology</li>
                  <li>Outputs pulse signal proportional to flow rate</li>
                  <li>Working flow rate range: 1-30L/min</li>
                </ul>
                <p className="text-muted-foreground text-sm">
                  <strong>Scientific principle:</strong> Uses a pinwheel with
                  embedded magnet that rotates with water flow, generating
                  pulses via Hall effect sensor. This allows precise measurement
                  of irrigation water usage and helps optimize water
                  consumption.
                </p>
              </div>
            </div>

            {/* Raspberry Pi */}
            <div className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-accent p-4">
                <h2 className="text-xl font-semibold text-accent-foreground">
                  Raspberry Pi 5 Microcontroller
                </h2>
              </div>
              <div className="p-6">
                <img
                  src="/rasberrypi.webp"
                  alt="Raspberry Pi"
                  className="w-full h-48 object-contain mb-4"
                />
                <p className="text-card-foreground mb-4">
                  The Raspberry Pi 5 serves as the central brain of the smart
                  greenhouse system, processing sensor data and controlling
                  various components.
                </p>
                <ul className="list-disc pl-5 mb-4 text-card-foreground">
                  <li>Powerful quad-core processor</li>
                  <li>Multiple I/O options (GPIO, I²C, SPI)</li>
                  <li>Network connectivity for remote monitoring</li>
                  <li>Runs Linux-based operating systems</li>
                </ul>
                <p className="text-muted-foreground text-sm">
                  <strong>Scientific principle:</strong> Operates as an embedded
                  computing system that implements control algorithms based on
                  environmental feedback loops. This enables automated
                  decision-making for optimal growing conditions.
                </p>
              </div>
            </div>

            {/* Camera */}
            <div className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-accent p-4">
                <h2 className="text-xl font-semibold text-accent-foreground">
                  Sony IMX219 8-Megapixel Camera
                </h2>
              </div>
              <div className="p-6">
                <img
                  src="/b010311.webp"
                  alt="Camera Module"
                  className="w-full h-48 object-contain mb-4"
                />
                <p className="text-card-foreground mb-4">
                  The Sony IMX219 camera module enables visual monitoring and
                  computer vision applications for the greenhouse system.
                </p>
                <ul className="list-disc pl-5 mb-4 text-card-foreground">
                  <li>8-megapixel resolution for detailed plant imaging</li>
                  <li>Compatible with Raspberry Pi CSI connector</li>
                  <li>Support for various image and video formats</li>
                </ul>
                <p className="text-muted-foreground text-sm">
                  <strong>Scientific principle:</strong> Captures visual light
                  in RGB spectrum, enabling plant growth analysis, disease
                  detection, and phenotyping through computer vision algorithms
                  and image processing techniques.
                </p>
              </div>
            </div>

            {/* Night Vision IR LEDs */}
            <div className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-accent p-4">
                <h2 className="text-xl font-semibold text-accent-foreground">
                  Night Vision Infrared IR LEDs
                </h2>
              </div>
              <div className="p-6">
                <img
                  src="/nightvisionleds.webp"
                  alt="IR LEDs"
                  className="w-full h-48 object-contain mb-4"
                />
                <p className="text-card-foreground mb-4">
                  Infrared LEDs enable 24/7 monitoring of greenhouse conditions
                  even in complete darkness.
                </p>
                <ul className="list-disc pl-5 mb-4 text-card-foreground">
                  <li>850nm wavelength IR illumination</li>
                  <li>Invisible to human eye but visible to camera sensors</li>
                  <li>Low power consumption</li>
                </ul>
                <p className="text-muted-foreground text-sm">
                  <strong>Scientific principle:</strong> Emits infrared
                  radiation that's invisible to human eyes but detectable by
                  camera sensors. This allows continuous monitoring without
                  disrupting plant photoperiods or circadian rhythms.
                </p>
              </div>
            </div>

            {/* Cooling Fans */}
            <div className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-accent p-4">
                <h2 className="text-xl font-semibold text-accent-foreground">
                  Cooling Fans
                </h2>
              </div>
              <div className="p-6">
                <img
                  src="/fans.webp"
                  alt="Cooling Fans"
                  className="w-full h-48 object-contain mb-4"
                />
                <p className="text-card-foreground mb-4">
                  Cooling fans help regulate temperature and improve air
                  circulation within the greenhouse environment.
                </p>
                <ul className="list-disc pl-5 mb-4 text-card-foreground">
                  <li>DC powered for energy efficiency</li>
                  <li>Speed-controllable through PWM</li>
                  <li>Optimized airflow pattern for even distribution</li>
                </ul>
                <p className="text-muted-foreground text-sm">
                  <strong>Scientific principle:</strong> Creates forced
                  convection that increases heat exchange efficiency and CO₂
                  distribution. This prevents hotspots, reduces humidity
                  gradients, and improves transpiration rates.
                </p>
              </div>
            </div>

            {/* RGB LEDs */}
            <div className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-accent p-4">
                <h2 className="text-xl font-semibold text-accent-foreground">
                  WS2812 RGB LEDs
                </h2>
              </div>
              <div className="p-6">
                <img
                  src="/rgbleds.webp"
                  alt="RGB LEDs"
                  className="w-full h-48 object-contain mb-4"
                />
                <p className="text-card-foreground mb-4">
                  WS2812 RGB LEDs provide programmable lighting for plant growth
                  optimization and visual indicators.
                </p>
                <ul className="list-disc pl-5 mb-4 text-card-foreground">
                  <li>Individually addressable RGB pixels</li>
                  <li>Integrated driver circuitry</li>
                  <li>Customizable light spectrum output</li>
                </ul>
                <p className="text-muted-foreground text-sm">
                  <strong>Scientific principle:</strong> Emits specific
                  wavelengths of light that can be tuned to optimize
                  photosynthesis efficiency and plant morphology. Different
                  light spectra influence growth patterns, flowering, and
                  fruiting.
                </p>
              </div>
            </div>

            {/* Water Cooling System */}
            <div className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-accent p-4">
                <h2 className="text-xl font-semibold text-accent-foreground">
                  Water Cooling System
                </h2>
              </div>
              <div className="p-6">
                <img
                  src="/coolingcup.webp"
                  alt="Water Cooling"
                  className="w-full h-48 object-contain mb-4"
                />
                <p className="text-card-foreground mb-4">
                  The water cooling system with heat sink provides efficient
                  thermal management for electronic components and helps
                  regulate greenhouse temperature.
                </p>
                <ul className="list-disc pl-5 mb-4 text-card-foreground">
                  <li>Closed-loop liquid cooling design</li>
                  <li>High thermal conductivity materials</li>
                  <li>Can be integrated with temperature control system</li>
                </ul>
                <p className="text-muted-foreground text-sm">
                  <strong>Scientific principle:</strong> Utilizes water's high
                  specific heat capacity to absorb and transfer thermal energy
                  efficiently. This allows for more precise temperature control
                  than air cooling alone.
                </p>
              </div>
            </div>

            {/* Water Pumps */}
            <div className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-accent p-4">
                <h2 className="text-xl font-semibold text-accent-foreground">
                  Water Pumps
                </h2>
              </div>
              <div className="p-6">
                <img
                  src="/pumps.webp"
                  alt="Water Pumps"
                  className="w-full h-48 object-contain mb-4"
                />
                <p className="text-card-foreground mb-4">
                  Water pumps drive the irrigation and cooling systems,
                  circulating water through the greenhouse setup.
                </p>
                <ul className="list-disc pl-5 mb-4 text-card-foreground">
                  <li>Submersible design for quiet operation</li>
                  <li>Variable flow rate capability</li>
                  <li>Low power consumption</li>
                </ul>
                <p className="text-muted-foreground text-sm">
                  <strong>Scientific principle:</strong> Converts electrical
                  energy to kinetic energy, creating pressure differential that
                  drives water flow. This enables precise water delivery to
                  plant roots and cooling systems.
                </p>
              </div>
            </div>

            {/* Solenoid Valves */}
            {/* <div className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-accent p-4">
                <h2 className="text-xl font-semibold text-accent-foreground">
                  Solenoid Valves
                </h2>
              </div>
              <div className="p-6">
                <img
                  src="/api/placeholder/400/300"
                  alt="Solenoid Valves"
                  className="w-full h-48 object-contain mb-4"
                />
                <p className="text-card-foreground mb-4">
                  Solenoid valves provide automated control of water flow to
                  different zones and systems within the greenhouse.
                </p>
                <ul className="list-disc pl-5 mb-4 text-card-foreground">
                  <li>Electrically controlled on/off operation</li>
                  <li>Normally closed design for safety</li>
                  <li>
                    Low voltage DC operation compatible with control systems
                  </li>
                </ul>
                <p className="text-muted-foreground text-sm">
                  <strong>Scientific principle:</strong> Uses electromagnetic
                  induction to move a magnetic plunger that opens or closes the
                  valve. This allows for precise control of fluid distribution
                  based on sensor feedback.
                </p>
              </div>
            </div> */}

            {/* Solar Panel */}
            <div className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-accent p-4">
                <h2 className="text-xl font-semibold text-accent-foreground">
                  Solar Panel (18V 30W)
                </h2>
              </div>
              <div className="p-6">
                <img
                  src="/solarpannel.webp"
                  alt="Solar Panel"
                  className="w-full h-48 object-contain mb-4"
                />
                <p className="text-card-foreground mb-4">
                  The solar panel provides renewable energy to power the
                  greenhouse monitoring and control systems.
                </p>
                <ul className="list-disc pl-5 mb-4 text-card-foreground">
                  <li>30W power output at peak efficiency</li>
                  <li>Monocrystalline silicon for higher efficiency</li>
                  <li>Weatherproof construction</li>
                </ul>
                <p className="text-muted-foreground text-sm">
                  <strong>Scientific principle:</strong> Converts light energy
                  into electrical energy through photovoltaic effect.
                  Semiconductor materials generate electron flow when exposed to
                  photons, creating sustainable power for the greenhouse system.
                </p>
              </div>
            </div>

            {/* Li-ion Batteries */}
            <div className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-accent p-4">
                <h2 className="text-xl font-semibold text-accent-foreground">
                  Li-ion Rechargeable Batteries
                </h2>
              </div>
              <div className="p-6">
                <img
                  src="/buttaries.webp"
                  alt="Li-ion Batteries"
                  className="w-full h-48 object-contain mb-4"
                />
                <p className="text-card-foreground mb-4">
                  18650 Li-ion batteries store energy from solar panels for
                  continuous operation during nighttime or cloudy conditions.
                </p>
                <ul className="list-disc pl-5 mb-4 text-card-foreground">
                  <li>3.7V nominal voltage</li>
                  <li>1000mAh capacity per cell</li>
                  <li>Rechargeable for sustainable operation</li>
                </ul>
                <p className="text-muted-foreground text-sm">
                  <strong>Scientific principle:</strong> Utilizes lithium ion
                  intercalation in electrode materials to store and release
                  electrical energy. This creates an energy buffer that ensures
                  system reliability despite variable solar input.
                </p>
              </div>
            </div>

            {/* Relay Modules */}
            <div className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-accent p-4">
                <h2 className="text-xl font-semibold text-accent-foreground">
                  Relay Modules
                </h2>
              </div>
              <div className="p-6">
                <img
                  src="/relays.webp"
                  alt="Relay Modules"
                  className="w-full h-48 object-contain mb-4"
                />
                <p className="text-card-foreground mb-4">
                  8-channel relay modules allow microcontrollers to switch
                  high-power devices like pumps, valves, and fans.
                </p>
                <ul className="list-disc pl-5 mb-4 text-card-foreground">
                  <li>Optically isolated inputs for safety</li>
                  <li>Controls AC and DC loads</li>
                  <li>LED status indicators</li>
                </ul>
                <p className="text-muted-foreground text-sm">
                  <strong>Scientific principle:</strong> Uses electromagnetic
                  induction to physically separate control circuits from power
                  circuits. This allows low-voltage microcontrollers to safely
                  control high-power devices.
                </p>
              </div>
            </div>

            {/* Robot Arm */}
            <div className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-accent p-4">
                <h2 className="text-xl font-semibold text-accent-foreground">
                  Robot Arm
                </h2>
              </div>
              <div className="p-6">
                <img
                  src="/arm.webp"
                  alt="Robot Arm"
                  className="w-full h-48 object-contain mb-4"
                />
                <p className="text-card-foreground mb-4">
                  The acrylic robot arm enables automated physical interactions
                  with plants for tasks like pruning, pollination, or sample
                  collection.
                </p>
                <ul className="list-disc pl-5 mb-4 text-card-foreground">
                  <li>Multiple degrees of freedom for complex movements</li>
                  <li>Servo motor-controlled joints</li>
                  <li>Programmable for repetitive tasks</li>
                </ul>
                <p className="text-muted-foreground text-sm">
                  <strong>Scientific principle:</strong> Uses kinematic chains
                  and servo-driven joints to translate algorithmic instructions
                  into precise physical movements. This enables automation of
                  tasks that would otherwise require human intervention.
                </p>
              </div>
            </div>

            {/* Arduino Uno */}
            <div className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-accent p-4">
                <h2 className="text-xl font-semibold text-accent-foreground">
                  Arduino Uno
                </h2>
              </div>
              <div className="p-6">
                <img
                  src="/arduino.webp"
                  alt="Arduino Uno"
                  className="w-full h-48 object-contain mb-4"
                />
                <p className="text-card-foreground mb-4">
                  Arduino Uno microcontrollers handle real-time sensing and
                  control tasks, working alongside the Raspberry Pi.
                </p>
                <ul className="list-disc pl-5 mb-4 text-card-foreground">
                  <li>ATmega328P microcontroller</li>
                  <li>14 digital I/O pins and 6 analog inputs</li>
                  <li>Real-time processing capabilities</li>
                </ul>
                <p className="text-muted-foreground text-sm">
                  <strong>Scientific principle:</strong> Utilizes a
                  microcontroller architecture for deterministic, real-time
                  processing of sensor data and actuator control. This provides
                  reliable timing-critical operations essential for
                  environmental control.
                </p>
              </div>
            </div>

            {/* PH and Temperature Sensor */}
            <div className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-accent p-4">
                <h2 className="text-xl font-semibold text-accent-foreground">
                  LSPH01 Soil & Water PH Sensor
                </h2>
              </div>
              <div className="p-6">
                <img
                  src="/phsensor.webp"
                  alt="PH Sensor"
                  className="w-full h-48 object-contain mb-4"
                />
                <p className="text-card-foreground mb-4">
                  The LSPH01 measures pH levels in soil and irrigation water,
                  critical for nutrient availability and plant health.
                </p>
                <ul className="list-disc pl-5 mb-4 text-card-foreground">
                  <li>Wide pH measurement range (0-14)</li>
                  <li>Integrated temperature compensation</li>
                  <li>Waterproof design for soil and water applications</li>
                </ul>
                <p className="text-muted-foreground text-sm">
                  <strong>Scientific principle:</strong> Uses a glass electrode
                  that develops an electrical potential proportional to hydrogen
                  ion concentration. This allows monitoring of soil
                  acidity/alkalinity, which directly affects nutrient
                  availability to plants.
                </p>
              </div>
            </div>

            {/* NPK Fertility Sensor */}
            <div className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-accent p-4">
                <h2 className="text-xl font-semibold text-accent-foreground">
                  RS-NPK-N01-TR Fertility Sensor
                </h2>
              </div>
              <div className="p-6">
                <img
                  src="/rsnpkn01tr.webp"
                  alt="NPK Sensor"
                  className="w-full h-48 object-contain mb-4"
                />
                <p className="text-card-foreground mb-4">
                  This specialized sensor measures soil nutrient levels of
                  Nitrogen (N), Phosphorus (P), and Potassium (K), the three
                  primary macronutrients for plant growth.
                </p>
                <ul className="list-disc pl-5 mb-4 text-card-foreground">
                  <li>RS485 digital communication interface</li>
                  <li>Simultaneous measurement of N, P, and K levels</li>
                  <li>Buried installation for direct soil contact</li>
                </ul>
                <p className="text-muted-foreground text-sm">
                  <strong>Scientific principle:</strong> Uses ion-selective
                  electrodes or spectroscopic techniques to measure nutrient ion
                  concentrations in soil solution. This enables precise
                  fertilization based on actual soil nutrient status.
                </p>
              </div>
            </div>
          </div>
        </div>

        <footer className="bg-card mt-12 py-6">
          <div className="container mx-auto px-4 text-center text-muted-foreground">
            <p>Smart Greenhouse Components - A Comprehensive Guide</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default EComp;

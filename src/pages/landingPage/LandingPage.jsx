import React from "react";
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
import GreenhouseScene from "./Greenhouse";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/AuthContext";

const LandingPage = () => {
  const { auth } = useAuth();
  return (
    <div className="">
      <GreenhouseScene />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="md:w-1/2">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  Smart Greenhouse{" "}
                  <span className="text-primary">Monitoring</span> System
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                  Advanced environmental control and monitoring for optimal
                  plant growth, powered by cutting-edge sensor technology and
                  intelligent automation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to={auth ? "/dashboard/charts" : "/signIn"}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
                  >
                    Get Started
                  </Link>
                  <Link
                    to={"/comp"}
                    className="px-6 py-3 bg-accent text-accent-foreground rounded-md font-medium hover:bg-accent/80 flex items-center justify-center gap-2 transition-colors"
                  >
                    View Components <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="relative bg-accent p-6 rounded-lg shadow-xl border border-border">
                  <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground p-2 rounded-md text-sm font-medium">
                    Smart Technology
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-card p-4 rounded-md border border-border">
                      <Thermometer className="text-primary h-8 w-8 mb-2" />
                      <h3 className="font-medium mb-1">
                        Environmental Sensing
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Monitor temperature, humidity, and air quality
                      </p>
                    </div>
                    <div className="bg-card p-4 rounded-md border border-border">
                      <Droplet className="text-primary h-8 w-8 mb-2" />
                      <h3 className="font-medium mb-1">Water Management</h3>
                      <p className="text-sm text-muted-foreground">
                        Smart flow control and moisture sensing
                      </p>
                    </div>
                    <div className="bg-card p-4 rounded-md border border-border">
                      <Sun className="text-primary h-8 w-8 mb-2" />
                      <h3 className="font-medium mb-1">Light Monitoring</h3>
                      <p className="text-sm text-muted-foreground">
                        UV detection and light intensity analysis
                      </p>
                    </div>
                    <div className="bg-card p-4 rounded-md border border-border">
                      <Leaf className="text-primary h-8 w-8 mb-2" />
                      <h3 className="font-medium mb-1">Soil Analysis</h3>
                      <p className="text-sm text-muted-foreground">
                        NPK testing and pH level monitoring
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Components Section */}
        <section className="py-16 bg-accent/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Core System Components
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our smart greenhouse system integrates high-precision sensors
                and reliable hardware to create the optimal growing environment
                for your plants.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Environmental Sensor */}
              <div className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">BME680 Sensor</h3>
                  <span className="bg-secondary text-secondary-foreground text-xs py-1 px-2 rounded-full">
                    500 EGP
                  </span>
                </div>
                <p className="text-muted-foreground mb-4">
                  Multi-parameter environmental sensor measuring pressure,
                  temperature, humidity and VOC levels.
                </p>
                <div className="flex items-center text-sm text-foreground/80">
                  <Check className="w-4 h-4 mr-2 text-primary" />
                  <span>Integrated 4-in-1 functionality</span>
                </div>
              </div>

              {/* Soil Sensors */}
              <div className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Soil Analysis Suite</h3>
                  <span className="bg-secondary text-secondary-foreground text-xs py-1 px-2 rounded-full">
                    17,200 EGP
                  </span>
                </div>
                <p className="text-muted-foreground mb-4">
                  Comprehensive soil monitoring including moisture, temperature,
                  pH, and NPK nutrient levels.
                </p>
                <div className="flex items-center text-sm text-foreground/80">
                  <Check className="w-4 h-4 mr-2 text-primary" />
                  <span>Professional-grade agricultural analytics</span>
                </div>
              </div>

              {/* Light Sensors */}
              <div className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">
                    Light Management System
                  </h3>
                  <span className="bg-secondary text-secondary-foreground text-xs py-1 px-2 rounded-full">
                    580 EGP
                  </span>
                </div>
                <p className="text-muted-foreground mb-4">
                  UV detection and light intensity monitoring with RGB LED grow
                  lights for plant optimization.
                </p>
                <div className="flex items-center text-sm text-foreground/80">
                  <Check className="w-4 h-4 mr-2 text-primary" />
                  <span>Adaptive lighting for optimal growth</span>
                </div>
              </div>

              {/* Computing System */}
              <div className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Processing Hub</h3>
                  <span className="bg-secondary text-secondary-foreground text-xs py-1 px-2 rounded-full">
                    7,360 EGP
                  </span>
                </div>
                <p className="text-muted-foreground mb-4">
                  Powerful Raspberry Pi 5 microcontroller with Arduino
                  integration for seamless automation.
                </p>
                <div className="flex items-center text-sm text-foreground/80">
                  <Check className="w-4 h-4 mr-2 text-primary" />
                  <span>Edge computing with real-time response</span>
                </div>
              </div>

              {/* Water System */}
              <div className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Water Management</h3>
                  <span className="bg-secondary text-secondary-foreground text-xs py-1 px-2 rounded-full">
                    2,265 EGP
                  </span>
                </div>
                <p className="text-muted-foreground mb-4">
                  Precision water flow measurement with pumps, valves and
                  cooling system for temperature regulation.
                </p>
                <div className="flex items-center text-sm text-foreground/80">
                  <Check className="w-4 h-4 mr-2 text-primary" />
                  <span>Smart irrigation with efficiency controls</span>
                </div>
              </div>

              {/* Automation & Robotics */}
              <div className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Robotic Assistance</h3>
                  <span className="bg-secondary text-secondary-foreground text-xs py-1 px-2 rounded-full">
                    700 EGP
                  </span>
                </div>
                <p className="text-muted-foreground mb-4">
                  Robotic arm for automated plant maintenance with camera vision
                  system for monitoring.
                </p>
                <div className="flex items-center text-sm text-foreground/80">
                  <Check className="w-4 h-4 mr-2 text-primary" />
                  <span>Precision handling with visual feedback</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* System Architecture */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-4">
                  Intelligent System Architecture
                </h2>
                <p className="text-muted-foreground mb-6">
                  Our greenhouse system combines multiple sensing technologies
                  with advanced computing for unparalleled environmental
                  control.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mt-1 bg-primary rounded-full p-1 mr-3">
                      <Check className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium">Solar-Powered Operation</h3>
                      <p className="text-muted-foreground text-sm">
                        18V 30W solar panel with Li-ion battery backup for
                        sustainable operation
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mt-1 bg-primary rounded-full p-1 mr-3">
                      <Check className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium">Advanced Imaging</h3>
                      <p className="text-muted-foreground text-sm">
                        Sony IMX219 8-Megapixel camera with night vision for
                        24/7 monitoring
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mt-1 bg-primary rounded-full p-1 mr-3">
                      <Check className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium">Thermal Management</h3>
                      <p className="text-muted-foreground text-sm">
                        Active cooling with temperature-controlled fans and
                        water cooling system
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mt-1 bg-primary rounded-full p-1 mr-3">
                      <Check className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium">Relay Automation</h3>
                      <p className="text-muted-foreground text-sm">
                        Multi-channel relay control for precise timing of all
                        greenhouse systems
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2">
                <div className="bg-muted p-6 rounded-lg border border-border">
                  <h3 className="font-medium mb-4 text-center">
                    System Component Breakdown
                  </h3>
                  <div className="space-y-3">
                    {[
                      { name: "Environmental Sensors", value: 12 },
                      { name: "Soil Analysis Suite", value: 65 },
                      { name: "Processing & Control", value: 17 },
                      { name: "Water Management", value: 5 },
                      { name: "Light & Vision", value: 6 },
                    ].map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{item.name}</span>
                          <span className="font-medium">{item.value}%</span>
                        </div>
                        <div className="w-full bg-accent rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-primary h-full rounded-full"
                            style={{ width: `${item.value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Key System Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
                Our smart greenhouse system combines cutting-edge technology
                with practical design for optimal crop management.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-background rounded-lg p-6 border border-border">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">
                  Environmental Control
                </h3>
                <p className="text-muted-foreground">
                  Precise monitoring and control of temperature, humidity, air
                  quality, and lighting for optimal growth conditions.
                </p>
              </div>

              <div className="bg-background rounded-lg p-6 border border-border">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Droplet className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">
                  Irrigation Management
                </h3>
                <p className="text-muted-foreground">
                  Smart water delivery with flow rate monitoring and soil
                  moisture detection for efficient resource usage.
                </p>
              </div>

              <div className="bg-background rounded-lg p-6 border border-border">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Sun className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Adaptive Lighting</h3>
                <p className="text-muted-foreground">
                  UV detection and supplemental RGB lighting to ensure optimal
                  photosynthesis and plant development.
                </p>
              </div>

              <div className="bg-background rounded-lg p-6 border border-border">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Nutrient Analytics</h3>
                <p className="text-muted-foreground">
                  High-precision NPK and pH sensors for comprehensive soil
                  health monitoring and fertility management.
                </p>
              </div>

              <div className="bg-background rounded-lg p-6 border border-border">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">
                  Sustainable Operation
                </h3>
                <p className="text-muted-foreground">
                  Solar-powered system with battery backup ensures
                  environmentally-friendly and continuous operation.
                </p>
              </div>

              <div className="bg-background rounded-lg p-6 border border-border">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <ArrowUpRight className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">
                  Automated Assistance
                </h3>
                <p className="text-muted-foreground">
                  Robotic arm and camera vision system for plant maintenance,
                  monitoring, and data collection.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-accent rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Ready to revolutionize your greenhouse?
                </h2>
                <p className="text-muted-foreground">
                  Get started with our complete smart greenhouse monitoring
                  system for enhanced crop yields and resource efficiency.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to={auth ? "/dashboard/charts" : "/signIn"}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
                >
                  Get Started
                </Link>
                <button className="px-6 py-3 bg-background text-foreground rounded-md font-medium hover:bg-background/80 border border-border transition-colors whitespace-nowrap">
                  Request Demo
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-muted py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="mb-8 md:mb-0">
                <div className="flex items-center mb-4">
                  <svg
                    className="h-8 w-8 text-primary"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L2 7L12 12L22 7L12 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 17L12 22L22 17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12L12 17L22 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="ml-2 text-primary font-bold text-xl">
                    Nexus
                  </span>
                </div>
                <p className="text-muted-foreground max-w-md">
                  Advanced greenhouse monitoring and automation systems for
                  modern agriculture.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-semibold mb-4">Products</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>
                      <a href="#" className="hover:text-foreground">
                        Sensors
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-foreground">
                        Controllers
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-foreground">
                        Software
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-foreground">
                        Complete Systems
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Resources</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>
                      <a href="#" className="hover:text-foreground">
                        Documentation
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-foreground">
                        Case Studies
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-foreground">
                        Blog
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-foreground">
                        Support
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Company</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>
                      <a href="#" className="hover:text-foreground">
                        About
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-foreground">
                        Contact
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-foreground">
                        Careers
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-foreground">
                        Press
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
              <p className="text-muted-foreground text-sm mb-4 md:mb-0">
                © 2025 Nexus Smart Agriculture. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Terms
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;

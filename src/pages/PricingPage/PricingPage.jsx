import { useState } from "react";
import { Check, X } from "lucide-react";

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: "Basic",
      description: "Perfect for individuals and small projects",
      price: annual ? "$99" : "$12",
      period: annual ? "/year" : "/month",
      features: [
        "Up to 3 projects",
        "Basic analytics",
        "24/7 support",
        "1 GB storage",
        "Export to PDF",
      ],
      notIncluded: [
        "Team collaboration",
        "Custom branding",
        "Advanced integrations",
      ],
      buttonText: "Get Started",
      highlight: false,
    },
    {
      name: "Pro",
      description: "Ideal for professionals and growing teams",
      price: annual ? "$199" : "$24",
      period: annual ? "/year" : "/month",
      features: [
        "Unlimited projects",
        "Advanced analytics",
        "24/7 priority support",
        "10 GB storage",
        "Export to PDF",
        "Team collaboration",
        "Custom branding",
      ],
      notIncluded: ["Advanced integrations"],
      buttonText: "Go Pro",
      highlight: true,
    },
    {
      name: "Enterprise",
      description: "For large teams with custom requirements",
      price: annual ? "$399" : "$49",
      period: annual ? "/year" : "/month",
      features: [
        "Unlimited projects",
        "Advanced analytics",
        "24/7 dedicated support",
        "Unlimited storage",
        "Export to any format",
        "Team collaboration",
        "Custom branding",
        "Advanced integrations",
        "Dedicated account manager",
      ],
      notIncluded: [],
      buttonText: "Contact Sales",
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include a 14-day
            free trial.
          </p>

          {/* Pricing Toggle */}
          <div className="flex items-center justify-center mt-8">
            <span
              className={`mr-3 ${
                annual ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className="relative inline-flex h-6 w-12 items-center rounded-full bg-accent transition-colors focus:outline-none"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-primary transition-transform ${
                  annual ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`ml-3 ${
                annual ? "text-muted-foreground" : "text-foreground"
              }`}
            >
              Annual
            </span>
            <span className="ml-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full">
              Save 20%
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-lg p-8 ${
                plan.highlight
                  ? "border-2 border-primary relative bg-card shadow-lg"
                  : "border border-border bg-card"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
                  Popular
                </span>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm">
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">
                    {plan.period}
                  </span>
                </div>
              </div>

              <div className="mb-8 space-y-3">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}

                {plan.notIncluded.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start text-muted-foreground"
                  >
                    <X className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                  plan.highlight
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h3 className="font-medium">Can I change plans later?</h3>
              <p className="text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. Changes
                will be reflected in your next billing cycle.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Do you offer refunds?</h3>
              <p className="text-muted-foreground">
                We offer a 14-day money-back guarantee. If you're not satisfied,
                contact us within 14 days of purchase.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">
                What payment methods do you accept?
              </h3>
              <p className="text-muted-foreground">
                We accept all major credit cards, PayPal, and bank transfers for
                annual plans.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">
                Do you have special pricing for non-profits?
              </h3>
              <p className="text-muted-foreground">
                Yes, we offer special discounts for non-profit organizations.
                Please contact our sales team for details.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 bg-accent rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Our team is here to help you find the perfect plan for your needs.
            Schedule a demo or reach out to our sales team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors">
              Schedule a Demo
            </button>
            <button className="bg-secondary text-secondary-foreground px-6 py-3 rounded-md font-medium hover:bg-secondary/80 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-muted-foreground text-sm">
          <p>© 2025 Your Company. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

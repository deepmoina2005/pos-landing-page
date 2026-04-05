import React from "react";
import { CheckCircle2, X, HelpCircle } from "lucide-react";

const FeatureComparisonTable = () => {
  const featureCategories = [
    {
      name: "Core POS Features",
      features: [
        { name: "Barcode Scanning", basic: true, pro: true, enterprise: true },
        { name: "Receipt Printing", basic: true, pro: true, enterprise: true },
        { name: "Product Management", basic: true, pro: true, enterprise: true },
        { name: "Customer Database", basic: true, pro: true, enterprise: true },
        { name: "Offline Mode", basic: true, pro: true, enterprise: true },
      ],
    },
    {
      name: "Advanced Features",
      features: [
        { name: "Multi-store Management", basic: false, pro: true, enterprise: true },
        { name: "Advanced Reporting", basic: false, pro: true, enterprise: true },
        { name: "Inventory Forecasting", basic: false, pro: true, enterprise: true },
        { name: "Staff Management", basic: false, pro: true, enterprise: true },
        { name: "API Access", basic: false, pro: true, enterprise: true },
      ],
    },
    {
      name: "Enterprise Features",
      features: [
        { name: "White Labeling", basic: false, pro: false, enterprise: true },
        { name: "Custom Development", basic: false, pro: false, enterprise: true },
        { name: "On-premise Deployment", basic: false, pro: false, enterprise: true },
        { name: "SLA Guarantee", basic: false, pro: false, enterprise: true },
        { name: "Dedicated Account Manager", basic: false, pro: false, enterprise: true },
      ],
    },
  ];

  const renderAvailability = (available) => {
    if (available === true) {
      return <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />;
    } else if (available === false) {
      return <X className="w-5 h-5 text-zinc-300 dark:text-zinc-700 mx-auto" />;
    } else {
      return <HelpCircle className="w-5 h-5 text-zinc-400 dark:text-zinc-500 mx-auto" />;
    }
  };

  const sectionHeaderClass =
    "bg-muted/60 dark:bg-zinc-800/60";
  const rowBorderClass =
    "border-border/60";
  const rowHoverClass =
    "hover:bg-muted/30 dark:hover:bg-zinc-800/30 transition-colors";
  const proColumnClass =
    "bg-primary/5 dark:bg-primary/10";
  const mutedTextClass =
    "text-muted-foreground";
  const strongTextClass =
    "text-foreground";

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-0">
        <thead>
          <tr className={sectionHeaderClass}>
            <th className="py-5 px-6 text-left font-medium text-muted-foreground rounded-tl-2xl">
              Features
            </th>

            <th className="py-5 px-6 text-center font-medium text-muted-foreground w-1/5">
              <div className="text-lg font-bold text-foreground">Basic</div>
              <div className="text-sm font-normal text-muted-foreground">₹999/month</div>
            </th>

            <th
              className={`py-5 px-6 text-center font-medium w-1/5 border-x border-primary/20 ${proColumnClass}`}
            >
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary mb-2">
                Most Popular
              </div>
              <div className="text-lg font-bold text-primary">Pro</div>
              <div className="text-sm font-normal text-muted-foreground">₹1,999/month</div>
            </th>

            <th className="py-5 px-6 text-center font-medium text-muted-foreground w-1/5 rounded-tr-2xl">
              <div className="text-lg font-bold text-foreground">Enterprise</div>
              <div className="text-sm font-normal text-muted-foreground">Custom Pricing</div>
            </th>
          </tr>
        </thead>

        <tbody>
          {featureCategories.map((category, categoryIndex) => (
            <React.Fragment key={categoryIndex}>
              <tr className={sectionHeaderClass}>
                <td
                  colSpan="4"
                  className={`py-3.5 px-6 text-left font-semibold text-foreground border-y ${rowBorderClass}`}
                >
                  {category.name}
                </td>
              </tr>

              {category.features.map((feature, featureIndex) => (
                <tr
                  key={featureIndex}
                  className={`${rowHoverClass} ${
                    featureIndex === category.features.length - 1 ? `border-b ${rowBorderClass}` : ""
                  }`}
                >
                  <td className={`py-4 px-6 text-left text-sm md:text-base ${strongTextClass} border-b ${rowBorderClass}`}>
                    {feature.name}
                  </td>

                  <td className={`py-4 px-6 text-center border-b ${rowBorderClass}`}>
                    {renderAvailability(feature.basic)}
                  </td>

                  <td
                    className={`py-4 px-6 text-center border-b border-x border-primary/20 ${proColumnClass}`}
                  >
                    {renderAvailability(feature.pro)}
                  </td>

                  <td className={`py-4 px-6 text-center border-b ${rowBorderClass}`}>
                    {renderAvailability(feature.enterprise)}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}

          <tr className={sectionHeaderClass}>
            <td
              colSpan="4"
              className={`py-3.5 px-6 text-left font-semibold text-foreground border-y ${rowBorderClass}`}
            >
              Support
            </td>
          </tr>

          <tr className={rowHoverClass}>
            <td className={`py-4 px-6 text-left ${strongTextClass} border-b ${rowBorderClass}`}>
              Email Support
            </td>
            <td className={`py-4 px-6 text-center ${mutedTextClass} border-b ${rowBorderClass}`}>
              Business Hours
            </td>
            <td
              className={`py-4 px-6 text-center text-foreground border-b border-x border-primary/20 ${proColumnClass}`}
            >
              24/7
            </td>
            <td className={`py-4 px-6 text-center text-foreground border-b ${rowBorderClass}`}>
              24/7 Priority
            </td>
          </tr>

          <tr className={rowHoverClass}>
            <td className={`py-4 px-6 text-left ${strongTextClass} border-b ${rowBorderClass}`}>
              Phone Support
            </td>
            <td className={`py-4 px-6 text-center border-b ${rowBorderClass}`}>
              <X className="w-5 h-5 text-zinc-300 dark:text-zinc-700 mx-auto" />
            </td>
            <td
              className={`py-4 px-6 text-center text-foreground border-b border-x border-primary/20 ${proColumnClass}`}
            >
              Business Hours
            </td>
            <td className={`py-4 px-6 text-center text-foreground border-b ${rowBorderClass}`}>
              24/7
            </td>
          </tr>

          <tr className={rowHoverClass}>
            <td className={`py-4 px-6 text-left ${strongTextClass} border-b ${rowBorderClass}`}>
              Response Time
            </td>
            <td className={`py-4 px-6 text-center ${mutedTextClass} border-b ${rowBorderClass}`}>
              48 hours
            </td>
            <td
              className={`py-4 px-6 text-center text-foreground border-b border-x border-primary/20 ${proColumnClass}`}
            >
              24 hours
            </td>
            <td className={`py-4 px-6 text-center text-foreground border-b ${rowBorderClass}`}>
              4 hours
            </td>
          </tr>
        </tbody>
      </table>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        For a complete list of features, please contact our sales team.
      </div>
    </div>
  );
};

export default FeatureComparisonTable;
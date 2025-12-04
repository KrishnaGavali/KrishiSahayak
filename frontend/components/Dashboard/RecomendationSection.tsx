import React from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Droplets,
  AlertTriangle,
  TrendingUp,
  Leaf,
  Bug,
  Sprout,
  BarChart3,
  DollarSign,
  Beaker,
} from "lucide-react";

// Dummy data structure
interface CropRecommendation {
  cropName: string;
  suitabilityScore: number;
  soilInfo: {
    type: string;
    phRange: string;
    fertilityRating: "Low" | "Medium" | "High";
    organicMatter: string;
  };
  weatherRisks: Array<{
    icon: string;
    title: string;
    description: string;
    severity: "low" | "medium" | "high";
  }>;
  cropVarieties: Array<{
    name: string;
    duration: string;
    expectedYield: string;
    season: string;
  }>;
  irrigationPlan: {
    dailyNeed: string;
    rainfallCoverage: string;
    schedule: string;
    recommendation: string;
  };
  fertilizerPlan: {
    basal: string;
    midStage: string;
    microNutrients: string;
    organicOptions: string;
  };
  pestDiseaseRisks: Array<{
    condition: string;
    risk: string;
    prevention: string;
  }>;
  cropRotationAdvice: Array<{
    cropName: string;
    benefit: string;
  }>;
  marketTrends: {
    msp: string;
    trend: "up" | "down" | "stable";
    nearestMandi: string;
    lastMonthChange: string;
  };
  profitabilityEstimate: {
    seedCost: string;
    fertilizerCost: string;
    irrigationCost: string;
    expectedYield: string;
    marketPrice: string;
    profitMargin: string;
  };
}

// Dummy crop recommendation data
const dummyCropData: CropRecommendation = {
  cropName: "Wheat",
  suitabilityScore: 85,
  soilInfo: {
    type: "Loamy Clay",
    phRange: "6.5 - 7.5",
    fertilityRating: "High",
    organicMatter: "2-3% recommended",
  },
  weatherRisks: [
    {
      icon: "🌡️",
      title: "Heatwave Alert",
      description: "Expected in 3 days, may impact grain filling",
      severity: "high",
    },
    {
      icon: "🌧️",
      title: "Heavy Rain Possible",
      description: "Next week - risk to ripe crop",
      severity: "medium",
    },
    {
      icon: "🌫️",
      title: "High Humidity",
      description: "Fungal disease risk - monitor closely",
      severity: "medium",
    },
    {
      icon: "💨",
      title: "Moderate Wind",
      description: "Safe for mature crop",
      severity: "low",
    },
  ],
  cropVarieties: [
    {
      name: "HD 2967",
      duration: "Medium (125-130 days)",
      expectedYield: "45-50 q/ha",
      season: "Winter",
    },
    {
      name: "PBW 343",
      duration: "Long (130-135 days)",
      expectedYield: "48-55 q/ha",
      season: "Winter",
    },
    {
      name: "DBW 17",
      duration: "Medium (120-125 days)",
      expectedYield: "42-48 q/ha",
      season: "Winter",
    },
  ],
  irrigationPlan: {
    dailyNeed: "4-5 mm per day",
    rainfallCoverage: "Expected rainfall will cover 60% of water needs",
    schedule: "Irrigation every 5-7 days",
    recommendation: "Drip irrigation recommended for water conservation",
  },
  fertilizerPlan: {
    basal: "120 kg N + 60 kg P2O5 + 40 kg K2O per hectare",
    midStage: "Split nitrogen application at tillering stage",
    microNutrients: "Zinc 5-10 kg/ha if deficiency observed",
    organicOptions: "Compost/FYM 5-10 tons/ha for soil improvement",
  },
  pestDiseaseRisks: [
    {
      condition: "High Humidity (>80%)",
      risk: "Powdery Mildew, Leaf Spot",
      prevention: "Regular spraying, remove infected leaves",
    },
    {
      condition: "High Temperature (>30°C)",
      risk: "Aphids, Armyworms",
      prevention: "Monitor crop, use neem spray if needed",
    },
    {
      condition: "Heavy Rain",
      risk: "Root Rot, Foot Rot",
      prevention: "Ensure proper drainage, fungicide application",
    },
  ],
  cropRotationAdvice: [
    {
      cropName: "Soybean or Chickpea",
      benefit: "Adds nitrogen to soil, breaks disease cycle",
    },
    {
      cropName: "Linseed",
      benefit: "Oil-rich crop, requires similar soil pH",
    },
  ],
  marketTrends: {
    msp: "₹2,015 per quintal",
    trend: "up",
    nearestMandi: "APMC Mandi - 25 km away",
    lastMonthChange: "+5% from last month",
  },
  profitabilityEstimate: {
    seedCost: "₹1,200-1,500/ha",
    fertilizerCost: "₹3,500-4,000/ha",
    irrigationCost: "₹2,000-2,500/ha",
    expectedYield: "45-50 quintals/ha",
    marketPrice: "₹2,000-2,100/quintal",
    profitMargin: "₹30,000-35,000/ha (approx)",
  },
};

interface RecommendationSectionProps {
  weatherData?: any;
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "high":
      return "bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-400";
    case "medium":
      return "bg-orange-500/10 border-orange-500/30 text-orange-700 dark:text-orange-400";
    case "low":
      return "bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-400";
    default:
      return "bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-400";
  }
};

const getSuitabilityColor = (score: number) => {
  if (score >= 80) return "text-green-600 dark:text-green-400";
  if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
  return "text-red-600 dark:text-red-400";
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "up":
      return <TrendingUp className="w-5 h-5 text-green-600" />;
    case "down":
      return <TrendingUp className="w-5 h-5 text-red-600 rotate-180" />;
    default:
      return <BarChart3 className="w-5 h-5 text-slate-600" />;
  }
};

const RecommendationSection = ({ weatherData }: RecommendationSectionProps) => {
  const crop = dummyCropData;

  return (
    <div className="space-y-6">
      {/* Header - Best Crop to Grow */}
      <Card className="bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                {crop.cropName}
              </h2>
              <p className="text-sm text-muted-foreground">
                Best crop to grow now
              </p>
            </div>
            <Leaf className="w-8 h-8 text-primary" />
          </div>

          {/* Suitability Score */}
          <div className="bg-background/50 backdrop-blur rounded-lg p-4 border border-border/50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-muted-foreground">
                Suitability Score
              </span>
              <span
                className={`text-3xl font-bold ${getSuitabilityColor(
                  crop.suitabilityScore
                )}`}
              >
                {crop.suitabilityScore}%
              </span>
            </div>
            <div className="w-full bg-muted/30 rounded-full h-3">
              <div
                className="bg-linear-to-r from-primary to-primary/60 h-3 rounded-full"
                style={{ width: `${crop.suitabilityScore}%` }}
              ></div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-border/50">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Temp Match</p>
                <p className="text-sm font-bold text-primary">92%</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Rainfall Match</p>
                <p className="text-sm font-bold text-primary">78%</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Humidity Match</p>
                <p className="text-sm font-bold text-primary">85%</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Soil Compat</p>
                <p className="text-sm font-bold text-primary">80%</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Soil Information */}
      <Card className="bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700">
        <div className="p-6">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Beaker className="w-5 h-5 text-primary" />
            Soil Requirements
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background/50 backdrop-blur rounded-lg p-4 border border-border/50">
              <p className="text-xs text-muted-foreground mb-1">Soil Type</p>
              <p className="font-semibold text-foreground">
                {crop.soilInfo.type}
              </p>
            </div>
            <div className="bg-background/50 backdrop-blur rounded-lg p-4 border border-border/50">
              <p className="text-xs text-muted-foreground mb-1">pH Range</p>
              <p className="font-semibold text-foreground">
                {crop.soilInfo.phRange}
              </p>
            </div>
            <div className="bg-background/50 backdrop-blur rounded-lg p-4 border border-border/50">
              <p className="text-xs text-muted-foreground mb-1">Fertility</p>
              <Badge
                variant="outline"
                className="bg-primary/10 border-primary/30 text-primary"
              >
                {crop.soilInfo.fertilityRating}
              </Badge>
            </div>
            <div className="bg-background/50 backdrop-blur rounded-lg p-4 border border-border/50">
              <p className="text-xs text-muted-foreground mb-1">
                Organic Matter
              </p>
              <p className="font-semibold text-foreground text-sm">
                {crop.soilInfo.organicMatter}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Upcoming Weather Risks */}
      <Card className="bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700">
        <div className="p-6">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-primary" />
            7-14 Day Weather Risks
          </h3>
          <div className="space-y-3">
            {crop.weatherRisks.map((risk, index) => (
              <div
                key={index}
                className={`rounded-lg p-4 border ${getSeverityColor(
                  risk.severity
                )}`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl">{risk.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{risk.title}</p>
                    <p className="text-xs mt-1 opacity-90">
                      {risk.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Recommended Crop Varieties */}
      <Card className="bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700">
        <div className="p-6">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Sprout className="w-5 h-5 text-primary" />
            Best Seed Varieties
          </h3>
          <div className="space-y-3">
            {crop.cropVarieties.map((variety, index) => (
              <div
                key={index}
                className="bg-background/50 backdrop-blur rounded-lg p-4 border border-border/50 hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="font-semibold text-foreground">
                    {variety.name}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {variety.season}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="text-sm font-medium text-foreground">
                      {variety.duration}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Yield</p>
                    <p className="text-sm font-medium text-primary">
                      {variety.expectedYield}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Irrigation Plan */}
      <Card className="bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700">
        <div className="p-6">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Droplets className="w-5 h-5 text-primary" />
            Irrigation Plan
          </h3>
          <div className="space-y-3">
            <div className="bg-background/50 backdrop-blur rounded-lg p-4 border border-border/50">
              <p className="text-xs text-muted-foreground mb-1">
                Daily Water Need
              </p>
              <p className="font-bold text-foreground">
                {crop.irrigationPlan.dailyNeed}
              </p>
            </div>
            <div className="bg-background/50 backdrop-blur rounded-lg p-4 border border-border/50">
              <p className="text-xs text-muted-foreground mb-1">
                Rainfall Coverage
              </p>
              <p className="font-semibold text-foreground text-sm">
                {crop.irrigationPlan.rainfallCoverage}
              </p>
            </div>
            <div className="bg-background/50 backdrop-blur rounded-lg p-4 border border-border/50">
              <p className="text-xs text-muted-foreground mb-1">Schedule</p>
              <p className="font-semibold text-foreground">
                {crop.irrigationPlan.schedule}
              </p>
            </div>
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">
                Recommendation
              </p>
              <p className="font-semibold text-primary text-sm">
                {crop.irrigationPlan.recommendation}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Fertilizer Plan */}
      <Card className="bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700">
        <div className="p-6">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-primary" />
            Fertilizer Plan (NPK Schedule)
          </h3>
          <div className="space-y-3">
            <div className="bg-background/50 backdrop-blur rounded-lg p-4 border border-border/50">
              <p className="text-xs text-muted-foreground mb-1 font-semibold">
                Basal Application
              </p>
              <p className="font-semibold text-foreground text-sm">
                {crop.fertilizerPlan.basal}
              </p>
            </div>
            <div className="bg-background/50 backdrop-blur rounded-lg p-4 border border-border/50">
              <p className="text-xs text-muted-foreground mb-1 font-semibold">
                Mid-Stage Fertilizer
              </p>
              <p className="font-semibold text-foreground text-sm">
                {crop.fertilizerPlan.midStage}
              </p>
            </div>
            <div className="bg-background/50 backdrop-blur rounded-lg p-4 border border-border/50">
              <p className="text-xs text-muted-foreground mb-1 font-semibold">
                Micro-Nutrients
              </p>
              <p className="font-semibold text-foreground text-sm">
                {crop.fertilizerPlan.microNutrients}
              </p>
            </div>
            <div className="bg-background/50 backdrop-blur rounded-lg p-4 border border-border/50">
              <p className="text-xs text-muted-foreground mb-1 font-semibold">
                Organic Options
              </p>
              <p className="font-semibold text-foreground text-sm">
                {crop.fertilizerPlan.organicOptions}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Pest & Disease Risk */}
      <Card className="bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700">
        <div className="p-6">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Bug className="w-5 h-5 text-primary" />
            Pest & Disease Risk Alerts
          </h3>
          <div className="space-y-3">
            {crop.pestDiseaseRisks.map((risk, index) => (
              <div
                key={index}
                className="bg-background/50 backdrop-blur rounded-lg p-4 border border-border/50"
              >
                <p className="font-semibold text-foreground text-sm mb-2">
                  {risk.condition}
                </p>
                <div className="grid gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Risk</p>
                    <p className="text-sm font-medium text-red-600 dark:text-red-400">
                      {risk.risk}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Prevention</p>
                    <p className="text-sm font-medium text-primary">
                      {risk.prevention}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Crop Rotation Advice */}
      <Card className="bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700">
        <div className="p-6">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Crop Rotation Advice
          </h3>
          <div className="space-y-3">
            {crop.cropRotationAdvice.map((advice, index) => (
              <div
                key={index}
                className="bg-background/50 backdrop-blur rounded-lg p-4 border border-border/50 hover:border-primary/30 transition-all"
              >
                <p className="font-semibold text-foreground mb-2">
                  {advice.cropName}
                </p>
                <p className="text-sm text-muted-foreground italic">
                  {advice.benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Market Trends */}
      <Card className="bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700">
        <div className="p-6">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Market Trends & MSP
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background/50 backdrop-blur rounded-lg p-4 border border-border/50">
              <p className="text-xs text-muted-foreground mb-1">
                MSP (Minimum Support Price)
              </p>
              <p className="font-bold text-foreground text-lg">
                {crop.marketTrends.msp}
              </p>
            </div>
            <div className="bg-background/50 backdrop-blur rounded-lg p-4 border border-border/50">
              <p className="text-xs text-muted-foreground mb-1">Trend</p>
              <div className="flex items-center gap-2">
                {getTrendIcon(crop.marketTrends.trend)}
                <p className="font-semibold text-foreground capitalize">
                  {crop.marketTrends.trend}
                </p>
              </div>
            </div>
            <div className="bg-background/50 backdrop-blur rounded-lg p-4 border border-border/50 col-span-2">
              <p className="text-xs text-muted-foreground mb-1">
                Nearest Mandi
              </p>
              <p className="font-semibold text-foreground">
                {crop.marketTrends.nearestMandi}
              </p>
            </div>
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 col-span-2">
              <p className="text-xs text-muted-foreground mb-1">
                Last Month Change
              </p>
              <p className="font-semibold text-primary text-lg">
                {crop.marketTrends.lastMonthChange}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Profitability Estimate */}
      <Card className="bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700">
        <div className="p-6">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            Profitability Estimate
          </h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background/50 backdrop-blur rounded-lg p-3 border border-border/50">
                <p className="text-xs text-muted-foreground mb-1">Seed Cost</p>
                <p className="font-bold text-foreground">
                  {crop.profitabilityEstimate.seedCost}
                </p>
              </div>
              <div className="bg-background/50 backdrop-blur rounded-lg p-3 border border-border/50">
                <p className="text-xs text-muted-foreground mb-1">
                  Fertilizer Cost
                </p>
                <p className="font-bold text-foreground">
                  {crop.profitabilityEstimate.fertilizerCost}
                </p>
              </div>
              <div className="bg-background/50 backdrop-blur rounded-lg p-3 border border-border/50">
                <p className="text-xs text-muted-foreground mb-1">
                  Irrigation Cost
                </p>
                <p className="font-bold text-foreground">
                  {crop.profitabilityEstimate.irrigationCost}
                </p>
              </div>
              <div className="bg-background/50 backdrop-blur rounded-lg p-3 border border-border/50">
                <p className="text-xs text-muted-foreground mb-1">
                  Expected Yield
                </p>
                <p className="font-bold text-foreground">
                  {crop.profitabilityEstimate.expectedYield}
                </p>
              </div>
            </div>
            <div className="bg-background/50 backdrop-blur rounded-lg p-4 border border-border/50">
              <p className="text-xs text-muted-foreground mb-1">
                Market Price (Per Quintal)
              </p>
              <p className="font-bold text-foreground">
                {crop.profitabilityEstimate.marketPrice}
              </p>
            </div>
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-2">
                Estimated Profit Margin
              </p>
              <p className="text-2xl font-bold text-primary">
                {crop.profitabilityEstimate.profitMargin}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RecommendationSection;

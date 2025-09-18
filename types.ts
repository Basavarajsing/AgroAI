export interface User {
  email: string;
  name: string;
  avatarUrl?: string;
}

export interface ManagementStrategy {
  title: string;
  description: string;
  isOrganic: boolean;
}

export interface AnalysisResult {
  id: string;
  cropName: string;
  isHealthy: boolean;
  diseaseName: string;
  confidenceScore: number;
  symptoms: string[];
  managementStrategies: ManagementStrategy[];
  preventiveMeasures: string[];
  description: string;
  imageUrl: string; // The image data URL that was analyzed
}

export interface HistoryItem extends AnalysisResult {}

export interface Resource {
  title: string;
  category: string;
  color: string;
  textColor: string;
  introduction: string;
  benefits: string[];
  materials?: string[];
  steps: { title: string; description: string }[];
}

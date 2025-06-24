export type TabsProps = {
  activeTab: string;
  handleTabClick: (tab: string) => void;
  vitalsData: any;
  isLoader: boolean;
};

// type DataProps = {
//   _id: string;
//   integration: 2;
//   createdAt: string;
//   sessionData: {
//     wellnessLevel: {
//       value: number;
//     };
//     wellnessIndex: {
//       value: number;
//     };
//   };
// };

// type TabTwoPropsTypes = {
//   _id: string;
//   integration: number;
//   sessionData: {
//     check_datetime: string;
//     colored_s3_url: string;
//     desease: string;
//     image_url?: string;
//   };
// };

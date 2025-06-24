import React from 'react';
import ListingCard from '@app/components/Cards';
import { motion } from 'framer-motion';

type ListingProps = {
  vitalsData: TabTwoPropsTypes[];
};

type TabTwoPropsTypes = {
  _id: string;
  integration: number;
  sessionData: {
    check_datetime: string;
    colored_s3_url: string;
    desease: string;
    image_url?: string;
  };
};

const Listing: React.FC<ListingProps> = ({ vitalsData }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: 'easeInOut' }}>
      {vitalsData?.map((item: TabTwoPropsTypes) => <ListingCard key={item._id} data={item} />)}
    </motion.div>
  );
};

export default Listing;

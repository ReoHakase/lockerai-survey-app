import { z } from 'zod';
import unsafeIndex from '../../public/data/index.json'; // eslint-disable-line

export const LabelSchema = z.object({
  label: z.string(),
  latency: z.number(),
});

export type Label = z.infer<typeof LabelSchema>;

export const LabelsSchema = z.record(z.array(LabelSchema).nonempty());

export const IndexSchema = z.object({
  labels: LabelsSchema,
});

export type Index = z.infer<typeof IndexSchema>;

export const getIndex = () => {
  return IndexSchema.parse(unsafeIndex);
};

export const getImageIds = (): string[] => {
  return Object.keys(getIndex().labels);
};

export const validateImageId = (imageId: string): boolean => {
  return getImageIds().includes(imageId);
};

export const getLabel = (imageId: string) => {
  return getIndex().labels[imageId][0];
};

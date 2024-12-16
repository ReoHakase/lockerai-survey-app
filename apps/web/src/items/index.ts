import { z } from 'zod';
import unsafeIndex from '../../public/data/index.json'; // eslint-disable-line

export const AttributesSchema = z.object({
  IsGroupOf: z.boolean(),
  IsInside: z.boolean(),
  IsOccluded: z.boolean(),
  IsDepiction: z.boolean(),
  IsTruncated: z.boolean(),
});

export const BoundingBoxSchema = z.tuple([
  z.number(), // x1
  z.number(), // y1
  z.number(), // x2
  z.number(), // y2
]);

export const LabelSchema = z.object({
  label: z.string(),
  bounding_box: BoundingBoxSchema,
  attributes: AttributesSchema,
});

export type Label = z.infer<typeof LabelSchema>;

export const LabelsSchema = z.record(z.array(LabelSchema).length(1));

export const IndexSchema = z.object({
  classes: z.null(), // null value for classes
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

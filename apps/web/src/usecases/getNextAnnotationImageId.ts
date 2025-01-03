import { eq } from 'drizzle-orm';
import { db } from '../db';
import { annotationTable } from '@/db/schema';
import { getImageIds } from '@/items';
import type { Email } from '@/states/atoms/email';

const pickOneRandomly = <T>(array: T[]) => {
  if (array.length === 0) {
    return null;
  }
  return array[Math.floor(Math.random() * array.length)];
};

export const getNextAnnotationImageId = async ({ email }: { email: Email }) => {
  // 1. DBからアノテーション済みの画像IDを取得
  const doneAnnotations = await db
    .select({ imageId: annotationTable.imageId })
    .from(annotationTable)
    .where(eq(annotationTable.annotator, 'human'));

  // 2. Setを使ってアノテーション済みIDを管理
  const doneImageIdSet = new Set(doneAnnotations.map((a) => a.imageId));

  // 3. 全ての画像IDをSetに変換
  const imageIds = getImageIds();
  const imageIdSet = new Set(imageIds);

  // 4. difference メソッドを使用して差分を取得
  const restImageIdSet = imageIdSet.difference(doneImageIdSet);
  const restImageIds = Array.from(restImageIdSet);

  console.info('restImageIds', restImageIdSet.size, restImageIds);

  if (restImageIds.length > 20) {
    // 5. 残りの画像IDからランダムに1つ選択
    return pickOneRandomly(restImageIds);
  }

  // 6. DBからアノテーション済みの画像IDを取得
  const myAnnotations = await db
    .select({ imageId: annotationTable.imageId })
    .from(annotationTable)
    .where(eq(annotationTable.email, email));

  const myImageIds = myAnnotations.map((a) => a.imageId);
  const myImageIdSet = new Set(myImageIds);
  const myRestImageIdSet = imageIdSet.difference(myImageIdSet);
  const myRestImageIds = Array.from(myRestImageIdSet);
  return pickOneRandomly(myRestImageIds);
};

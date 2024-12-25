import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cx } from 'styled-system/css';
import { markupHeading } from 'styled-system/recipes';

const dictionary: Record<string, string> = {
  'Alarm clock': '置き時計',
  Backpack: 'バックパック',
  Belt: 'ベルト',
  Book: '本',
  Calculator: '計算機',
  Camera: 'カメラ',
  Cosmetics: '化粧品',
  Earrings: 'イヤリング',
  Footwear: '靴',
  Glove: '手袋, グローブ',
  Goggles: 'ゴーグル, メガネ',
  'Hair dryer': 'ヘアドライヤー',
  Handbag: 'ハンドバッグ',
  Hat: '帽子',
  Headphones: 'ヘッドフォン',
  Helmet: 'ヘルメット',
  Ipod: 'Ipod',
  Laptop: 'ラップトップ',
  'Mobile phone': 'スマホ, 携帯電話',
  Necklace: 'ネックレス',
  Pen: 'ペン',
  'Pencil case': 'ケース',
  'Ring binder': 'バインダー',
  Ruler: '定規',
  Sandal: 'サンダル',
  Sock: '靴下',
  Suitcase: 'スーツケース',
  'Tablet computer': 'タブレットコンピュータ',
  Umbrella: '傘',
  Watch: '腕時計',
} as const;

export type ImageLabelProps = ComponentPropsWithRef<'p'> & {
  label: string;
};

export const ImageLabel = ({ className, label, ...props }: ImageLabelProps): ReactNode => {
  const labelText = dictionary[label] ?? label;
  return (
    <p className={cx(markupHeading({ level: 'h3' }), className)} {...props}>
      分類: {labelText}
    </p>
  );
};

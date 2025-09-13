import { NumericFormat } from 'react-number-format';

import type { NairaNumberFormatProps } from '~/lib/interfaces/ui.interface';

const NairaNumberFormat = ({
  value,
  isBold,
  isPrefix = true,
  fontSize,
  color,
  fontWeight,
}: NairaNumberFormatProps) => {
  return (
    <NumericFormat
      value={value}
      displayType="text"
      thousandSeparator
      prefix={isPrefix ? '₦' : ''}
      style={{
        fontWeight: isBold ? fontWeight : 'normal',
        fontSize: fontSize || '24px',
        color: color || 'headText.100',
      }}
    />
  );
};

export default NairaNumberFormat;

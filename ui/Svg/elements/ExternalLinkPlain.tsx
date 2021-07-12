/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

export const SvgExternalLinkPlain: React.FC = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={12} height={12} viewBox="0 0 12 12" {...props}>
    <path
      className="tofill"
      fillRule="evenodd"
      d="M12.5.893v10.214c0 .77-.624 1.393-1.393 1.393H.893c-.77 0-1.393-.624-1.393-1.393V.893C-.5.123.124-.5.893-.5h10.214c.77 0 1.393.624 1.393 1.393zm-2.554.464H6.697c-.618 0-.93.75-.492 1.189l.928.928-5.674 5.674a.348.348 0 000 .492l.9.9a.347.347 0 00.493 0l5.674-5.673.928.928c.436.436 1.189.13 1.189-.492v-3.25a.697.697 0 00-.697-.696z"
    />
  </svg>
);

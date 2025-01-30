/* eslint-disable react/jsx-props-no-spreading */
import React, { CSSProperties, FC, ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { PrimaryButtonStyle } from './style';

export enum PRIMARYTYPE {
  BUTTON = 'BUTTON',
  EXTERNAL = 'EXTERNAL',
  INTERNAL = 'INTERNAL',
}

type ButtonProps = {
  onClick: () => void;
  cssClass: string;
  style?: CSSProperties;
  children: ReactNode;
  props?: any;
};

const Button: FC<ButtonProps> = ({
  onClick,
  cssClass,
  children,
  style,
  props,
}) => (
  <PrimaryButtonStyle
    type="button"
    className={cssClass}
    onClick={onClick}
    style={style}
    {...props}
  >
    {children}
  </PrimaryButtonStyle>
);

type ExternalLinkProps = {
  cssClass: string;
  children: ReactNode;
  onClick: () => void;
  href: string;
  style?: CSSProperties;
  props?: any;
};

const ExternalLink: FC<ExternalLinkProps> = ({
  cssClass,
  children,
  href,
  onClick,
  style,
  ...props
}) => (
  <PrimaryButtonStyle
    as="a"
    className={cssClass}
    target="_blank"
    rel="noopener"
    onClick={onClick}
    href={href}
    style={style}
    {...props}
  >
    {children}
  </PrimaryButtonStyle>
);

type InternalLinkProps = {
  cssClass: string;
  children: ReactNode;
  onClick: () => void;
  href: string;
  style?: CSSProperties;
  props?: any;
};

const InternalLink: FC<InternalLinkProps> = ({
  cssClass,
  children,
  href,
  onClick,
  style,
  ...props
}) => (
  <PrimaryButtonStyle
    as={Link}
    className={cssClass}
    to={href}
    onClick={onClick}
    style={style}
    {...props}
  >
    {children}
  </PrimaryButtonStyle>
);

type PrimaryButtonProps = {
  type: keyof typeof PRIMARYTYPE;
  onClick?: () => void;
  href?: string;
  children: ReactNode;
  style?: CSSProperties;
  props?: any;
};

export const PrimaryButton: FC<PrimaryButtonProps> = ({
  type,
  onClick,
  href,
  children,
  style,
  ...props
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick: () => void = () => {
    const sleep = (time: number) =>
      new Promise(resolve => {
        setTimeout(resolve, time);
      });

    if (onClick) {
      onClick();
    }
    setIsClicked(true);
    sleep(250).then(() => setIsClicked(false));
  };

  if (type === PRIMARYTYPE.EXTERNAL) {
    return (
      <ExternalLink
        cssClass={isClicked ? 'clicked' : ''}
        onClick={handleClick}
        href={href || '#'}
        style={style}
        {...props}
      >
        {children}
      </ExternalLink>
    );
  }

  if (type === PRIMARYTYPE.INTERNAL) {
    return (
      <InternalLink
        cssClass={isClicked ? 'clicked' : ''}
        onClick={handleClick}
        href={href || '#'}
        style={style}
        {...props}
      >
        {children}
      </InternalLink>
    );
  }

  return (
    <Button
      cssClass={isClicked ? 'clicked' : ''}
      onClick={handleClick}
      style={style}
      {...props}
    >
      {children}
    </Button>
  );
};

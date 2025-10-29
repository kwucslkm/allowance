import styled from 'styled-components';
import { colors, typography, spacing, borderRadius, shadows, breakpoints, transitions } from './tokens';

// Container
export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${spacing.md};

  @media (min-width: ${breakpoints.tablet}) {
    padding: 0 ${spacing.lg};
  }
`;

// Card
export const Card = styled.div`
  background: ${colors.background.primary};
  border: 1px solid ${colors.border.light};
  border-radius: ${borderRadius.lg};
  padding: ${spacing.lg};
  box-shadow: ${shadows.sm};
  transition: all ${transitions.base};

  &:hover {
    box-shadow: ${shadows.md};
  }
`;

// Button
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm};
  font-family: ${typography.fontFamily.primary};
  font-weight: ${typography.fontWeight.medium};
  border: none;
  border-radius: ${borderRadius.md};
  cursor: pointer;
  transition: all ${transitions.base};
  white-space: nowrap;

  ${({ size = 'md' }) => {
    const sizes = {
      sm: `
        padding: ${spacing.sm} ${spacing.md};
        font-size: ${typography.fontSize.sm};
      `,
      md: `
        padding: ${spacing.md} ${spacing.lg};
        font-size: ${typography.fontSize.base};
      `,
      lg: `
        padding: ${spacing.lg} ${spacing.xl};
        font-size: ${typography.fontSize.lg};
      `,
    };
    return sizes[size];
  }}

  ${({ variant = 'primary' }) => {
    const variants = {
      primary: `
        background: ${colors.primary.main};
        color: ${colors.text.inverse};

        &:hover:not(:disabled) {
          background: ${colors.primary.hover};
        }
      `,
      secondary: `
        background: ${colors.background.secondary};
        color: ${colors.text.primary};
        border: 1px solid ${colors.border.main};

        &:hover:not(:disabled) {
          background: ${colors.background.tertiary};
        }
      `,
      danger: `
        background: ${colors.danger};
        color: ${colors.text.inverse};

        &:hover:not(:disabled) {
          background: #dc2626;
        }
      `,
      ghost: `
        background: transparent;
        color: ${colors.text.primary};

        &:hover:not(:disabled) {
          background: ${colors.background.secondary};
        }
      `,
    };
    return variants[variant];
  }}

  ${({ fullWidth }) => fullWidth && `
    width: 100%;
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.main};
    outline-offset: 2px;
  }
`;

// Input
interface InputProps {
  error?: boolean;
}

export const Input = styled.input<InputProps>`
  width: 100%;
  padding: ${spacing.md};
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize.base};
  color: ${colors.text.primary};
  background: ${colors.background.primary};
  border: 1px solid ${({ error }) => error ? colors.danger : colors.border.main};
  border-radius: ${borderRadius.md};
  transition: all ${transitions.base};

  &::placeholder {
    color: ${colors.text.tertiary};
  }

  &:hover:not(:disabled) {
    border-color: ${colors.border.dark};
  }

  &:focus {
    outline: none;
    border-color: ${colors.primary.main};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &:disabled {
    background: ${colors.background.secondary};
    cursor: not-allowed;
  }
`;

// Label
export const Label = styled.label`
  display: block;
  margin-bottom: ${spacing.sm};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.text.primary};
`;

// FormGroup
export const FormGroup = styled.div`
  margin-bottom: ${spacing.lg};
`;

// ErrorMessage
export const ErrorMessage = styled.p`
  margin-top: ${spacing.sm};
  font-size: ${typography.fontSize.sm};
  color: ${colors.danger};
`;

// Table
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${colors.background.primary};
  border-radius: ${borderRadius.lg};
  overflow: hidden;
  box-shadow: ${shadows.sm};
`;

export const TableHead = styled.thead`
  background: ${colors.background.secondary};

  th {
    padding: ${spacing.md};
    text-align: left;
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.semibold};
    color: ${colors.text.secondary};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

export const TableBody = styled.tbody`
  tr {
    border-top: 1px solid ${colors.border.light};
    transition: background ${transitions.fast};

    &:hover {
      background: ${colors.background.secondary};
    }
  }

  td {
    padding: ${spacing.md};
    font-size: ${typography.fontSize.base};
    color: ${colors.text.primary};
  }
`;

// Badge
interface BadgeProps {
  variant?: 'success' | 'warning' | 'danger' | 'info';
}

export const Badge = styled.span<BadgeProps>`
  display: inline-flex;
  align-items: center;
  padding: ${spacing.xs} ${spacing.sm};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
  border-radius: ${borderRadius.full};

  ${({ variant = 'info' }) => {
    const variants = {
      success: `
        background: rgba(16, 185, 129, 0.1);
        color: ${colors.status.success};
      `,
      warning: `
        background: rgba(245, 158, 11, 0.1);
        color: ${colors.status.warning};
      `,
      danger: `
        background: rgba(239, 68, 68, 0.1);
        color: ${colors.status.error};
      `,
      info: `
        background: rgba(59, 130, 246, 0.1);
        color: ${colors.status.info};
      `,
    };
    return variants[variant];
  }}
`;

// Grid
export const Grid = styled.div<{ columns?: number; gap?: string }>`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${({ gap }) => gap || spacing.lg};

  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(${({ columns }) => columns || 2}, 1fr);
  }

  @media (min-width: ${breakpoints.desktop}) {
    grid-template-columns: repeat(${({ columns }) => columns || 3}, 1fr);
  }
`;

// Flex
export const Flex = styled.div<{
  direction?: 'row' | 'column';
  align?: string;
  justify?: string;
  gap?: string;
  wrap?: boolean;
}>`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  align-items: ${({ align }) => align || 'stretch'};
  justify-content: ${({ justify }) => justify || 'flex-start'};
  gap: ${({ gap }) => gap || spacing.md};
  ${({ wrap }) => wrap && 'flex-wrap: wrap;'}
`;

// Heading
export const Heading = styled.h1<{ as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' }>`
  margin: 0 0 ${spacing.md} 0;
  font-family: ${typography.fontFamily.primary};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.text.primary};
  line-height: ${typography.lineHeight.tight};

  ${({ as = 'h1' }) => {
    const sizes = {
      h1: `font-size: ${typography.fontSize['4xl']};`,
      h2: `font-size: ${typography.fontSize['3xl']};`,
      h3: `font-size: ${typography.fontSize['2xl']};`,
      h4: `font-size: ${typography.fontSize.xl};`,
      h5: `font-size: ${typography.fontSize.lg};`,
      h6: `font-size: ${typography.fontSize.base};`,
    };
    return sizes[as];
  }}
`;

// Text
export const Text = styled.p<{ size?: 'sm' | 'base' | 'lg'; color?: 'primary' | 'secondary' | 'tertiary' }>`
  margin: 0;
  font-family: ${typography.fontFamily.primary};
  line-height: ${typography.lineHeight.normal};

  ${({ size = 'base' }) => {
    const sizes = {
      sm: `font-size: ${typography.fontSize.sm};`,
      base: `font-size: ${typography.fontSize.base};`,
      lg: `font-size: ${typography.fontSize.lg};`,
    };
    return sizes[size];
  }}

  ${({ color = 'primary' }) => {
    const textColors = {
      primary: `color: ${colors.text.primary};`,
      secondary: `color: ${colors.text.secondary};`,
      tertiary: `color: ${colors.text.tertiary};`,
    };
    return textColors[color];
  }}
`;

// Divider
export const Divider = styled.hr`
  margin: ${spacing.lg} 0;
  border: none;
  border-top: 1px solid ${colors.border.light};
`;

// IconButton
export const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: ${borderRadius.md};
  color: ${colors.text.secondary};
  cursor: pointer;
  transition: all ${transitions.fast};

  &:hover:not(:disabled) {
    background: ${colors.background.secondary};
    color: ${colors.text.primary};
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.main};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

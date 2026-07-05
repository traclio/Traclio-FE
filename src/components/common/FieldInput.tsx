import styled from '@emotion/styled';
import type { KeyboardEvent } from 'react';

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const FieldLabel = styled.span`
  font-family: 'Pretendard', -apple-system, sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 1.6;
  color: #000000;
`;

const InputBox = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  background: #ffffff;
  border: 1px solid #aec1cc;
  border-radius: 8px;
  padding: 8px 12px;
  box-sizing: border-box;
  box-shadow: inset -0.5px -0.5px 1px 0px rgba(58, 61, 66, 0.2);
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-family: 'Pretendard', -apple-system, sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 1.6;
  color: #1d1d1d;

  &::placeholder {
    color: #aec1cc;
  }
`;

interface FieldInputProps {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export function FieldInput({ placeholder, value, onChange, onKeyDown }: FieldInputProps) {
  return (
    <InputBox>
      <StyledInput
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
      />
    </InputBox>
  );
}

interface LabeledFieldProps extends FieldInputProps {
  label: string;
}

export function LabeledField({ label, ...fieldInputProps }: LabeledFieldProps) {
  return (
    <FieldGroup>
      <FieldLabel>{label}</FieldLabel>
      <FieldInput {...fieldInputProps} />
    </FieldGroup>
  );
}

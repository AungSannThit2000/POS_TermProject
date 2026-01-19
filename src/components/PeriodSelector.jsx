import { ToggleButton, ToggleButtonGroup } from "@mui/material";
export default function PeriodSelector({ value, onChange }) {
  return (
    <ToggleButtonGroupexclusivevalue={value}onChange={(_, v) => v && onChange(v)}
      size="small"
    >
      <ToggleButton value="daily">Daily</ToggleButton>
      <ToggleButton value="weekly">Weekly</ToggleButton>
      <ToggleButton value="monthly">Monthly</ToggleButton>
    </ToggleButtonGroup>
  );
}
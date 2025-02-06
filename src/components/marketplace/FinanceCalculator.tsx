import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface FinanceCalculatorProps {
  className?: string;
}

const FinanceCalculator = ({ className = "" }: FinanceCalculatorProps) => {
  const [values, setValues] = React.useState({
    carPrice: 20000,
    deposit: 2000,
    term: 36,
  });

  const interestRate = 6.9;
  const monthlyPayment =
    ((values.carPrice - values.deposit) * (1 + interestRate / 100)) /
    values.term;

  return (
    <Card className={`p-6 ${className}`}>
      <h3 className="text-xl font-semibold mb-6">Finance Calculator</h3>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Car Price: £{values.carPrice.toLocaleString()}</Label>
          <Slider
            value={[values.carPrice]}
            onValueChange={([value]) =>
              setValues({ ...values, carPrice: value })
            }
            max={100000}
            step={1000}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label>Deposit: £{values.deposit.toLocaleString()}</Label>
          <Slider
            value={[values.deposit]}
            onValueChange={([value]) =>
              setValues({ ...values, deposit: value })
            }
            max={values.carPrice}
            step={500}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label>Term: {values.term} months</Label>
          <Slider
            value={[values.term]}
            onValueChange={([value]) => setValues({ ...values, term: value })}
            min={12}
            max={60}
            step={12}
            className="w-full"
          />
        </div>

        <div className="pt-4 border-t">
          <div className="text-sm text-muted-foreground mb-2">
            Interest Rate: {interestRate}% APR
          </div>
          <div className="text-2xl font-bold">
            £{Math.round(monthlyPayment).toLocaleString()} /month
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            Total amount payable: £
            {Math.round(monthlyPayment * values.term).toLocaleString()}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FinanceCalculator;

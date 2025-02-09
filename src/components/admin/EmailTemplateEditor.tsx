import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  variables: string[];
}

interface EmailTemplateEditorProps {
  template: EmailTemplate;
  onSave: (template: EmailTemplate) => void;
}

export function EmailTemplateEditor({
  template,
  onSave,
}: EmailTemplateEditorProps) {
  const [formData, setFormData] = React.useState(template);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Template Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="body">Body</Label>
            <Textarea
              id="body"
              value={formData.body}
              onChange={(e) =>
                setFormData({ ...formData, body: e.target.value })
              }
              rows={10}
            />
          </div>

          <div>
            <Label>Available Variables</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.variables.map((variable) => (
                <code
                  key={variable}
                  className="px-2 py-1 bg-muted rounded text-sm"
                >
                  {`{{${variable}}}`}
                </code>
              ))}
            </div>
          </div>
        </div>

        <Button type="submit">Save Template</Button>
      </Card>
    </form>
  );
}

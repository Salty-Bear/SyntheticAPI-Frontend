"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, Copy, ExternalLink, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

type DataType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'date'
  | 'email'
  | 'url'
  | 'uuid'
  | 'array'
  | 'object'
  | 'file'
  | 'image'
  | 'video'
  | 'audio';

interface SchemaField {
  id: string;
  key: string;
  dataType: DataType;
  required: boolean;
  description?: string;
}

export function GenerationForm() {
  const [fields, setFields] = useState<SchemaField[]>([
    { id: '1', key: '', dataType: 'string', required: true },
  ]);
  const [endpointUrl, setEndpointUrl] = useState('');
  const [method, setMethod] = useState<'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'>(
    'POST'
  );
  const [numberOfRecords, setNumberOfRecords] = useState(10);

  const addField = () => {
    setFields([
      ...fields,
      { id: Date.now().toString(), key: '', dataType: 'string', required: false },
    ]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const updateField = (id: string, updates: Partial<SchemaField>) => {
    setFields(
      fields.map((field) => (field.id === id ? { ...field, ...updates } : field))
    );
  };

  const handleGenerate = async () => {
    const schema = fields.reduce((acc, field) => {
      if (field.key) {
        acc[field.key] = {
          type: field.dataType,
          required: field.required,
          description: field.description,
        };
      }
      return acc;
    }, {} as Record<string, any>);

    console.log('Generating synthetic data with schema:', {
      endpoint: endpointUrl,
      method,
      schema,
      count: numberOfRecords,
    });

    // TODO: Call API to generate synthetic data
  };

  const getSchemaPreview = () => {
    const schema = fields.reduce((acc, field) => {
      if (field.key) {
        acc[field.key] = field.dataType;
      }
      return acc;
    }, {} as Record<string, string>);
    return JSON.stringify(schema, null, 2);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getSchemaPreview());
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Endpoint Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="endpoint">API Endpoint URL</Label>
              <div className="flex gap-2">
                <Input
                  id="endpoint"
                  placeholder="https://api.example.com/users or https://tunnel.example.ngrok.io/api/users"
                  value={endpointUrl}
                  onChange={(e) => setEndpointUrl(e.target.value)}
                  className="flex-1"
                />
                {endpointUrl && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => window.open(endpointUrl, '_blank')}
                    title="Open in new tab"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
                <Link href="/tunnels" passHref legacyBehavior>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    title="Go to Tunnel Page"
                  >
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <p className="text-xs text-muted-foreground">
                Enter your deployed backend URL or tunnel link (ngrok, localtunnel, etc.)
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="method">HTTP Method</Label>
                <Select value={method} onValueChange={(value: typeof method) => setMethod(value)}>
                  <SelectTrigger id="method">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="PATCH">PATCH</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="records">Records to Generate</Label>
                <Input
                  id="records"
                  type="number"
                  min="1"
                  max="100000"
                  value={numberOfRecords}
                  onChange={(e) => setNumberOfRecords(Number(e.target.value))}
                />
                <p className="text-xs text-muted-foreground">
                  Max: 100,000 records
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Schema Definition</CardTitle>
            <Button onClick={addField} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Field
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.map((field) => (
              <div key={field.id} className="space-y-3 p-4 border rounded-lg">
                <div className="grid grid-cols-[1fr,1fr,auto] gap-3">
                  <div className="space-y-2">
                    <Label htmlFor={`key-${field.id}`}>Key</Label>
                    <Input
                      id={`key-${field.id}`}
                      placeholder="e.g., username"
                      value={field.key}
                      onChange={(e) => updateField(field.id, { key: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`type-${field.id}`}>Data Type</Label>
                    <Select
                      value={field.dataType}
                      onValueChange={(value: DataType) => 
                        updateField(field.id, { dataType: value })
                      }
                    >
                      <SelectTrigger id={`type-${field.id}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="string">String</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                        <SelectItem value="boolean">Boolean</SelectItem>
                        <SelectItem value="date">Date</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="url">URL</SelectItem>
                        <SelectItem value="uuid">UUID</SelectItem>
                        <SelectItem value="array">Array</SelectItem>
                        <SelectItem value="object">Object</SelectItem>
                        <SelectItem value="file">File</SelectItem>
                        <SelectItem value="image">Image</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="audio">Audio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeField(field.id)}
                      disabled={fields.length === 1}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`required-${field.id}`}
                    checked={field.required}
                    onCheckedChange={(checked) => 
                      updateField(field.id, { required: checked === true })
                    }
                  />
                  <Label 
                    htmlFor={`required-${field.id}`} 
                    className="text-sm font-normal cursor-pointer"
                  >
                    Required field
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`desc-${field.id}`} className="text-sm">
                    Description (optional)
                  </Label>
                  <Input
                    id={`desc-${field.id}`}
                    placeholder="Brief description for context"
                    value={field.description || ''}
                    onChange={(e) => updateField(field.id, { description: e.target.value })}
                  />
                </div>
              </div>
            ))}

            <Button onClick={handleGenerate} className="w-full" size="lg">
              Generate Synthetic Data
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Schema Preview</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <Textarea
              value={getSchemaPreview()}
              readOnly
              className="font-mono text-sm min-h-[400px]"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generated Data Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground text-center py-8">
              Generate data to see preview
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

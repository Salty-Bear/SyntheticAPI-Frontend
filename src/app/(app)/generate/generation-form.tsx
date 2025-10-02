"use client";

import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

import { useGenerateState, Generate } from '@/hooks/generate';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Trash2, Copy, ExternalLink, Link as LinkIcon, Search, Edit } from 'lucide-react';
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
  const { toast } = useToast();
  // --- State for form fields ---
  const [fields, setFields] = useState<SchemaField[]>([
    { id: '1', key: '', dataType: 'string', required: true },
  ]);
  const [endpointUrl, setEndpointUrl] = useState('');
  const [method, setMethod] = useState<'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'>('POST');
  const [numberOfRecords, setNumberOfRecords] = useState(10);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedSchemaId, setSelectedSchemaId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [schemaToDelete, setSchemaToDelete] = useState<string | null>(null);

  // --- User ID (replace with actual user context/auth) ---
  const userId = typeof window !== 'undefined' ? (localStorage.getItem('user_id') || 'demo-user') : 'demo-user';

  // --- Generate hooks ---
  const {
    fetchAllGenerates,
  createGenerate,
  updateGenerate,
    executeGenerate,
    deleteGenerate,
    generates,
    loadingGenerates,
    creatingGenerate,
    executingGenerate,
    fetchGenerateById,
    currentGenerate,
    clearCurrentGenerate,
  } = useGenerateState();

  // --- Load all previous schemas on mount ---
  useEffect(() => {
    fetchAllGenerates({ user_id: userId });
  }, [userId]);

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


  // --- Save schema (create generate task) ---
  const handleSave = async () => {
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

    try {
      if (selectedSchemaId) {
        // Update existing schema
        const id = typeof selectedSchemaId === 'string' ? selectedSchemaId : (selectedSchemaId as any)?.get?.() ?? '';
        if (id) {
          await updateGenerate(id, {
            name: name || 'Untitled Schema',
            description,
            data_type: 'json',
            count: numberOfRecords,
            schema,
            format: 'json',
            status: 'active',
            enabled: true,
            user_id: userId,
            output_data: null,
          });
          toast({ title: 'Schema updated', description: 'Your schema was updated successfully.' });
        }
      } else {
        // Create new schema
        await createGenerate({
          name: name || 'Untitled Schema',
          description,
          data_type: 'json',
          count: numberOfRecords,
          schema,
          format: 'json',
          status: 'active',
          enabled: true,
          user_id: userId,
          output_data: null,
        });
        toast({ title: 'Schema saved', description: 'Your schema was saved successfully.' });
      }
      setName('');
      setDescription('');
      setSelectedSchemaId(null);
      setIsDialogOpen(false);
      fetchAllGenerates({ user_id: userId });
    } catch (e) {
      toast({ title: 'Save failed', description: e?.message || 'Failed to save schema.' });
    }
  };

  // --- Generate data (execute generate task) ---
  const handleGenerate = async () => {
    if (!selectedSchemaId && !currentGenerate?.id) return;
    let id = selectedSchemaId || currentGenerate?.id;
    if (!id) return;
    // Always unwrap hookstate if present
    if (id && typeof id !== 'string' && typeof id.get === 'function') {
      id = id.get();
    }
    if (typeof id !== 'string') return;
    try {
      await executeGenerate(id, userId);
      fetchAllGenerates({ user_id: userId });
  toast({ title: 'Generation started', description: 'Data generation started for this schema.' });
    } catch (e) {
  toast({ title: 'Generation failed', description: e?.message || 'Failed to generate data.' });
    }
  };

  // --- Load schema into form ---
  const handleLoadSchema = async (generate: Generate) => {
    setSelectedSchemaId(generate.id || null);
    setIsDialogOpen(true);
    try {
      const data = await fetchGenerateById(generate.id as string, userId);
      setName(data.name || '');
      setDescription(data.description || '');
      setNumberOfRecords(data.count || 10);
      let loadedFields: SchemaField[] = [];
      let schemaObj = data.schema || {};
      // If backend returns array of {Key, Value} objects
      if (Array.isArray(schemaObj) && schemaObj.length && schemaObj[0].Key && schemaObj[0].Value) {
        loadedFields = schemaObj.map((field: any, idx: number) => {
          const key = field.Key;
          let dataType: DataType = 'string';
          let required = false;
          let description = '';
          if (Array.isArray(field.Value)) {
            for (const prop of field.Value) {
              if (prop.Key === 'type') dataType = prop.Value as DataType;
              if (prop.Key === 'required') required = prop.Value;
              if (prop.Key === 'description') description = prop.Value;
            }
          }
          return {
            id: `${idx + 1}`,
            key,
            dataType,
            required,
            description,
          };
        });
      } else {
        // fallback to previous logic for object/other formats
        if (Array.isArray(schemaObj)) {
          schemaObj = schemaObj.reduce((acc: any, field: any) => {
            if (field.key) acc[field.key] = field;
            return acc;
          }, {});
        } else if (
          Object.keys(schemaObj).every(k => !isNaN(Number(k))) &&
          Object.values(schemaObj).every((v: any) => v && typeof v === 'object' && 'key' in v)
        ) {
          schemaObj = Object.values(schemaObj).reduce((acc: any, field: any) => {
            if (field.key) acc[field.key] = field;
            return acc;
          }, {});
        }
        loadedFields = Object.entries(schemaObj).map(([key, val]: [string, any], idx) => ({
          id: `${idx + 1}`,
          key,
          dataType: val.type || 'string',
          required: val.required || false,
          description: val.description || '',
        }));
      }
      setFields(loadedFields.length ? loadedFields : [{ id: '1', key: '', dataType: 'string', required: true }]);
      toast({ title: 'Schema loaded', description: `Loaded schema: ${data.name}` });
    } catch (e) {
      toast({ title: 'Load failed', description: 'Could not load schema from server.' });
    }
  };

  // --- Clear form ---
  const handleClear = () => {
    setFields([{ id: '1', key: '', dataType: 'string', required: true }]);
    setEndpointUrl('');
    setMethod('POST');
    setNumberOfRecords(10);
    setName('');
    setDescription('');
    setSelectedSchemaId(null);
    setIsDialogOpen(false);
    clearCurrentGenerate();
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

  // --- Delete schema ---
  const handleDeleteClick = (schemaId: string) => {
    setSchemaToDelete(schemaId);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!schemaToDelete) return;
    
    try {
      await deleteGenerate(schemaToDelete, userId);
      toast({ title: 'Schema deleted', description: 'The schema was deleted successfully.' });
      fetchAllGenerates({ user_id: userId });
      if (selectedSchemaId === schemaToDelete) {
        setSelectedSchemaId(null);
      }
    } catch (e) {
      toast({ title: 'Delete failed', description: e?.message || 'Failed to delete schema.' });
    } finally {
      setDeleteConfirmOpen(false);
      setSchemaToDelete(null);
    }
  };

  // --- Filter schemas based on search query ---
  const filteredSchemas = generates.get().filter(schema => 
    schema.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    schema.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* --- Main View with Saved Schemas and Create New Button --- */}
      <div className="flex items-center justify-between">
        {/* <div>
          <h1 className="text-2xl font-bold">Data Generation</h1>
          <p className="text-muted-foreground">Create synthetic data schemas and generate test data</p>
        </div> */}

      </div>

      {/* --- Saved Schemas Table --- */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Your Schemas</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your saved data schemas and generate synthetic data
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search schemas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
                      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2">
              <Plus className="h-4 w-4" />
              Create New Schema
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Data Schema</DialogTitle>
              <DialogDescription>
                Define your data structure and configuration to generate synthetic data
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="schema-name">Schema Name *</Label>
                    <Input 
                      id="schema-name" 
                      placeholder="e.g., User Data Schema" 
                      value={name} 
                      onChange={e => setName(e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schema-desc">Description</Label>
                    <Input 
                      id="schema-desc" 
                      placeholder="Brief description" 
                      value={description} 
                      onChange={e => setDescription(e.target.value)} 
                    />
                  </div>
                </div>
              </div>

              {/* Generation Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Generation Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="records">Number of Records</Label>
                    <Input
                      id="records"
                      type="number"
                      min="1"
                      max="100000"
                      value={numberOfRecords}
                      onChange={(e) => setNumberOfRecords(Number(e.target.value))}
                    />
                    <p className="text-xs text-muted-foreground">Max: 100,000 records</p>
                  </div>
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
                </div>
              </div>

              {/* Endpoint Configuration */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Endpoint Configuration (Optional)</h3>
                <div className="space-y-2">
                  <Label htmlFor="endpoint">API Endpoint URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="endpoint"
                      placeholder="https://api.example.com/users"
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
                        title="Test endpoint"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                    <Link href="/tunnels" passHref legacyBehavior>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        title="Manage tunnels"
                      >
                        <LinkIcon className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Optional: Enter your API endpoint to send generated data
                  </p>
                </div>
              </div>

              {/* Schema Fields and Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Schema Fields */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Data Fields</h3>
                    <Button onClick={addField} size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Field
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {fields.map((field) => (
                      <div key={field.id} className="p-4 border rounded-lg space-y-3">
                        <div className="grid grid-cols-[1fr,1fr,auto] gap-3">
                          <div className="space-y-2">
                            <Label htmlFor={`key-${field.id}`}>Field Name *</Label>
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
                                <SelectItem value="string">Text</SelectItem>
                                <SelectItem value="number">Number</SelectItem>
                                <SelectItem value="boolean">True/False</SelectItem>
                                <SelectItem value="date">Date</SelectItem>
                                <SelectItem value="email">Email</SelectItem>
                                <SelectItem value="url">URL</SelectItem>
                                <SelectItem value="uuid">Unique ID</SelectItem>
                                <SelectItem value="array">List</SelectItem>
                                <SelectItem value="object">Object</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex items-end">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeField(field.id)}
                              disabled={fields.length === 1}
                              title="Remove field"
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
                            placeholder="Additional context for this field"
                            value={field.description || ''}
                            onChange={(e) => updateField(field.id, { description: e.target.value })}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Schema Preview */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Schema Preview</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyToClipboard}
                      title="Copy schema"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="border rounded-lg p-4">
                    <Textarea
                      value={getSchemaPreview()}
                      readOnly
                      className="font-mono text-sm min-h-[300px] resize-none border-0 p-0 focus-visible:ring-0"
                      placeholder="Your schema structure will appear here as you add fields..."
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    This preview shows the JSON structure that will be used to generate your data.
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={handleClear}>
                Clear
              </Button>
              <Button onClick={handleSave} disabled={creatingGenerate.get() || !name.trim()}>
                {creatingGenerate.get() ? 'Creating...' : 'Create Schema'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loadingGenerates.get() ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-sm text-muted-foreground">Loading schemas...</div>
            </div>
          ) : generates.get().length === 0 ? (
            <div className="text-center py-8">
              <div className="text-sm text-muted-foreground mb-4">
                No schemas created yet. Create your first schema to get started.
              </div>
            </div>
          ) : filteredSchemas.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-sm text-muted-foreground mb-4">
                No schemas found matching "{searchQuery}"
              </div>
            </div>
          ) : (
            <div style={{ maxHeight: 'calc(100vh - 300px)', overflowY: 'auto' }}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-center">Records</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSchemas.map((schema) => (
                    <TableRow key={schema.id}>
                      <TableCell className="font-medium">
                        {schema.name || 'Untitled Schema'}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {schema.description || '—'}
                      </TableCell>
                      <TableCell className="text-center">
                        {schema.count || 10}
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20">
                          {schema.status || 'active'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLoadSchema(schema)}
                            title="Edit schema"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={async () => {
                              setSelectedSchemaId(schema.id);
                              setTimeout(() => handleGenerate(), 100);
                            }}
                            disabled={executingGenerate.get()}
                            size="sm"
                            title="Generate data"
                          >
                            {executingGenerate.get() ? 'Generating...' : 'Generate'}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteClick(schema.id)}
                            className="text-destructive hover:text-destructive"
                            title="Delete schema"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>



      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Schema</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this schema? This action cannot be undone and will permanently remove the schema and all its configurations.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteConfirmOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Schema
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

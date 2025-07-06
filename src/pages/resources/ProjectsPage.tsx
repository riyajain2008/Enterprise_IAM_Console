
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FolderOpen, Plus, Settings, Users, Calendar, Globe } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'archived';
  createdAt: string;
  lastActivity: string;
  members: number;
  environment: 'production' | 'staging' | 'development';
}

const ProjectsPage = () => {
  const [projects] = useState<Project[]>([
    {
      id: '1',
      name: 'Project Alpha',
      description: 'Main production application with user authentication and billing',
      status: 'active',
      createdAt: '2024-01-15',
      lastActivity: '2024-01-20',
      members: 12,
      environment: 'production'
    },
    {
      id: '2',
      name: 'Project Beta',
      description: 'Internal dashboard for analytics and reporting',
      status: 'active',
      createdAt: '2024-01-10',
      lastActivity: '2024-01-19',
      members: 8,
      environment: 'staging'
    },
    {
      id: '3',
      name: 'Project Gamma',
      description: 'Experimental features and A/B testing platform',
      status: 'inactive',
      createdAt: '2023-12-20',
      lastActivity: '2024-01-05',
      members: 4,
      environment: 'development'
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-yellow-100 text-yellow-800">Inactive</Badge>;
      case 'archived':
        return <Badge className="bg-gray-100 text-gray-800">Archived</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getEnvironmentBadge = (env: string) => {
    switch (env) {
      case 'production':
        return <Badge className="bg-red-100 text-red-800">Production</Badge>;
      case 'staging':
        return <Badge className="bg-blue-100 text-blue-800">Staging</Badge>;
      case 'development':
        return <Badge className="bg-gray-100 text-gray-800">Development</Badge>;
      default:
        return <Badge variant="outline">{env}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <FolderOpen className="w-8 h-8 mr-3" />
            Projects
          </h1>
          <p className="text-gray-600 mt-1">Manage your organization's projects and environments</p>
        </div>
        
        <Button className="flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Projects</p>
                <p className="text-2xl font-bold">{projects.length}</p>
              </div>
              <FolderOpen className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {projects.filter(p => p.status === 'active').length}
                </p>
              </div>
              <Globe className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Members</p>
                <p className="text-2xl font-bold">
                  {projects.reduce((sum, p) => sum + p.members, 0)}
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Production</p>
                <p className="text-2xl font-bold text-red-600">
                  {projects.filter(p => p.environment === 'production').length}
                </p>
              </div>
              <Settings className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
          <CardDescription>
            Overview of all projects in your organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Environment</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <FolderOpen className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="font-medium">{project.name}</div>
                        <div className="text-xs text-gray-500">ID: {project.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <p className="text-sm text-gray-600 truncate">{project.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(project.status)}</TableCell>
                  <TableCell>{getEnvironmentBadge(project.environment)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>{project.members}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{new Date(project.lastActivity).toLocaleDateString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectsPage;

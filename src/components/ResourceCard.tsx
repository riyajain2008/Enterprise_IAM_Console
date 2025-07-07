
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ResourceAction {
  label: string;
  action: () => void;
  variant: "default" | "outline" | "destructive";
  icon: React.ReactNode;
  enabled: boolean;
}

interface ResourceStat {
  label: string;
  value: string;
}

interface ResourceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  actions: ResourceAction[];
  stats?: ResourceStat[];
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  description,
  icon,
  actions,
  stats = []
}) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3 mb-2">
          {icon}
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
        
        {stats.length > 0 && (
          <div className="flex space-x-4 mt-3">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-2">
        {actions.map((action, index) => (
          <Button
            key={index}
            onClick={action.action}
            variant={action.variant}
            size="sm"
            className="w-full justify-start"
            disabled={!action.enabled}
          >
            {action.icon}
            <span className="ml-2">{action.label}</span>
            {!action.enabled && (
              <Badge variant="secondary" className="ml-auto text-xs">
                No Access
              </Badge>
            )}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default ResourceCard;

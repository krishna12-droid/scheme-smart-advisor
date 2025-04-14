
import { Scheme } from "@/types";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface SchemeCardProps {
  scheme: Scheme;
}

const SchemeCard = ({ scheme }: SchemeCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case 'LIC':
        return 'bg-blue-100 text-blue-800';
      case 'Star Health':
        return 'bg-emerald-100 text-emerald-800';
      case 'Government':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="scheme-card">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <Badge className={getProviderColor(scheme.provider)}>{scheme.provider}</Badge>
            <Badge variant="outline" className="ml-2">{scheme.type}</Badge>
          </div>
        </div>
        <CardTitle className="text-xl mt-2">{scheme.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {scheme.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        {expanded && (
          <>
            <h4 className="font-semibold text-sm mb-1">Benefits:</h4>
            <ul className="list-disc pl-5 mb-4 text-sm">
              {scheme.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
            
            {scheme.coverageAmount && (
              <div className="mb-2">
                <span className="text-sm font-semibold">Coverage: </span>
                <span className="text-sm">{scheme.coverageAmount}</span>
              </div>
            )}
            
            {scheme.premium && (
              <div className="mb-2">
                <span className="text-sm font-semibold">Premium: </span>
                <span className="text-sm">{scheme.premium}</span>
              </div>
            )}
            
            {scheme.documents && (
              <div className="mb-2">
                <h4 className="font-semibold text-sm mb-1">Required Documents:</h4>
                <ul className="list-disc pl-5 text-sm">
                  {scheme.documents.map((doc, index) => (
                    <li key={index}>{doc}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="px-0 text-sm w-full justify-start"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" /> Show Less
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" /> Show More
            </>
          )}
        </Button>
      </CardContent>
      
      <CardFooter>
        <Button asChild className="w-full">
          <a href={scheme.applicationLink} target="_blank" rel="noopener noreferrer">
            Apply Now <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SchemeCard;

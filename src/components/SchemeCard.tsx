
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
import { ExternalLink, ChevronDown, ChevronUp, Heart } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SchemeCardProps {
  scheme: Scheme;
}

const SchemeCard = ({ scheme }: SchemeCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

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
    <Card className={cn(
      "scheme-card group transition-all duration-300 hover:shadow-lg",
      "transform hover:-translate-y-1",
      "animate-in fade-in-50 duration-500"
    )}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex gap-2 flex-wrap">
            <Badge className={getProviderColor(scheme.provider)}>{scheme.provider}</Badge>
            <Badge variant="outline">{scheme.type}</Badge>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"
              )}
            />
          </Button>
        </div>
        <CardTitle className="text-xl mt-2">{scheme.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {scheme.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className={cn(
          "transition-all duration-300",
          expanded ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
        )}>
          <h4 className="font-semibold text-sm mb-1">Benefits:</h4>
          <ul className="list-disc pl-5 mb-4 text-sm space-y-1">
            {scheme.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
          
          {scheme.coverage_amount && (
            <div className="mb-2">
              <span className="text-sm font-semibold">Coverage: </span>
              <span className="text-sm">{scheme.coverage_amount}</span>
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
              <ul className="list-disc pl-5 text-sm space-y-1">
                {scheme.documents.map((doc, index) => (
                  <li key={index}>{doc}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="px-0 text-sm w-full justify-start hover:bg-transparent"
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
        <Button asChild className="w-full gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
          <a href={scheme.application_link} target="_blank" rel="noopener noreferrer">
            Apply Now <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SchemeCard;

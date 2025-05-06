import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import StarRating from '@/components/StarRating';
import { toast } from '@/hooks/use-toast';
import { saveFeedback } from '@/utils/storage';
import { useNavigate } from 'react-router-dom';

const feedbackSchema = z.object({
  groupSize: z.string()
    .refine(val => !isNaN(Number(val)), {
      message: "Doit être un nombre",
    })
    .refine(val => Number(val) >= 1 && Number(val) <= 20, {
      message: "Le nombre de personnes doit être entre 1 et 20",
    }),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
  name: z.string().optional(),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

interface FeedbackFormProps {
  locationId: number;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ locationId }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      groupSize: '',
      rating: 0,
      comment: '',
      name: '',
    },
  });

  const onSubmit = async (data: FeedbackFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Now using the async version of saveFeedback
      await saveFeedback({
        locationId: locationId,
        groupSize: Number(data.groupSize),
        rating: data.rating,
        comment: data.comment || '',
        timestamp: new Date().toISOString(),
        name: data.name
      });
      
      toast({
        title: "Merci pour votre avis !",
        description: "Votre participation a été enregistrée avec succès.",
      });
      
      setTimeout(() => {
        navigate('/merci');
      }, 1500);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Un problème est survenu lors de l'envoi de votre avis.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="groupSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Combien êtes-vous dans le groupe ?</FormLabel>
              <FormControl>
                <Input 
                  type="tel"
                  placeholder="Nombre de personnes" 
                  inputMode="numeric"
                  pattern="[0-9]*"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quelle est votre appréciation de ce lieu ?</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <StarRating 
                    value={field.value} 
                    onChange={(newRating) => field.onChange(newRating)} 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Commentaire (facultatif)</FormLabel>
              <FormControl>
                <textarea
                  className="w-full min-h-24 p-3 border rounded-md"
                  placeholder="Partagez votre opinion sur ce lieu..."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom / Prénom (facultatif)</FormLabel>
              <FormControl>
                <Input placeholder="Votre nom" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full bg-artPath-accent hover:bg-green-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Envoi en cours..." : "Envoyer mon avis"}
        </Button>
      </form>
    </Form>
  );
};

export default FeedbackForm;

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { FileText, Send, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export function RFQModal({ trigger }: { trigger?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState('');
  const [qty, setQty] = useState('');
  const [details, setDetails] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAiSuggest = () => {
    setIsAiLoading(true);
    setTimeout(() => {
      setProduct((prev) => prev || 'Industrial Steel Pipes');
      setQty((prev) => prev || '500');
      setDetails((prev) => {
        const aiSpecs = `AI Suggested Specifications:\n- Material Grade: 316L Stainless Steel\n- Dimensions: 2" Schedule 40\n- Lead Time: Within 14 days\n- Certification: ISO 9001 required`;
        return prev ? `${prev}\n\n${aiSpecs}` : aiSpecs;
      });
      setIsAiLoading(false);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('RFQ Submitted', { product, qty, details });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="default" className="gap-2 transition-all hover:scale-105 active:scale-95 shadow-sm hover:shadow">
            <FileText size={16} />
            Get Quotes
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-background/85 dark:bg-[#070f1d]/90 backdrop-blur-2xl border border-border/40 rounded-3xl shadow-2xl overflow-hidden dark:shadow-black/40">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground font-serif">
            Request for Quotation (RFQ)
          </DialogTitle>
          <DialogDescription className="text-muted-foreground font-light text-sm">
            Tell us what you need, and we'll match you with verified suppliers.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="mt-2">
          <motion.div 
            className="space-y-5 relative pt-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex justify-end absolute right-0 -top-8">
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                className="h-8 text-xs gap-1.5 border-accent/30 text-accent hover:bg-accent/10 hover:border-accent/50 transition-all rounded-full shadow-sm hover:shadow hover:-translate-y-0.5 duration-300" 
                onClick={handleAiSuggest} 
                disabled={isAiLoading}
              >
                <Sparkles size={14} className={isAiLoading ? "animate-spin text-accent" : "text-accent"} />
                {isAiLoading ? 'Analyzing...' : 'AI Autofill'}
              </Button>
            </div>

            <motion.div variants={itemVariants} className="space-y-2 group">
              <Label htmlFor="productName" className="text-sm font-medium transition-colors group-focus-within:text-accent">Product Name</Label>
              <Input 
                id="productName" 
                value={product} 
                onChange={e => setProduct(e.target.value)} 
                placeholder="e.g., Industrial Steel Pipes" 
                required 
                className="transition-all focus-visible:ring-accent focus:border-accent hover:border-accent/40 bg-background/40 dark:bg-card/40 border-border/60 rounded-xl"
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="space-y-2 group">
              <Label htmlFor="quantity" className="text-sm font-medium transition-colors group-focus-within:text-accent">Quantity Required</Label>
              <Input 
                id="quantity" 
                type="number" 
                value={qty} 
                onChange={e => setQty(e.target.value)} 
                placeholder="e.g., 500" 
                required 
                className="transition-all focus-visible:ring-accent focus:border-accent hover:border-accent/40 bg-background/40 dark:bg-card/40 border-border/60 rounded-xl"
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="space-y-2 group">
              <Label htmlFor="details" className="text-sm font-medium transition-colors group-focus-within:text-accent">Additional Details</Label>
              <Textarea 
                id="details" 
                value={details}
                onChange={e => setDetails(e.target.value)}
                placeholder="Include specifications, materials, timeline, or any special requirements..."
                className="min-h-[110px] resize-none transition-all focus-visible:ring-accent focus:border-accent hover:border-accent/40 bg-background/40 dark:bg-card/40 border-border/60 rounded-xl"
                required
              />
            </motion.div>
          </motion.div>
          
          <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-border/40">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors rounded-xl">
              Cancel
            </Button>
            <Button type="submit" className="gap-2 bg-accent hover:bg-accent/90 text-white transition-all hover:scale-[1.03] hover:-translate-y-0.5 active:scale-95 shadow-md hover:shadow-accent/30 rounded-xl">
              <Send size={16} />
              Submit RFQ
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

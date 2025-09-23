import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Phone as PhoneIcon, Landmark } from 'lucide-react';
import { useCart } from '@/components/CartContext';
import { useMemo, useState } from 'react';

function generateOrderNumber() {
  const now = new Date();
  return `ORD-${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}-${Math.random().toString(36).slice(2,8).toUpperCase()}`;
}

// QR generation removed per request

export default function CartModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { state, totalBirr, totalQuantity, clear } = useCart();
  const [orderId, setOrderId] = useState<string | null>(null);
  // QR code removed
  const [phone, setPhone] = useState<string>("");
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const summary = useMemo(() => ({ totalBirr, totalQuantity }), [totalBirr, totalQuantity]);

  const handlePay = async () => {
    // Require Ethiopian phone number (+251...) or 09/07 prefixed local numbers
    const cleaned = phone.replace(/\s|-/g, "");
    const valid = /^(\+2519\d{8}|\+2517\d{8}|09\d{8}|07\d{8})$/.test(cleaned);
    if (!valid) {
      setPhoneError("Please enter a valid Ethiopian phone number.");
      return;
    }
    setPhoneError(null);
    const id = generateOrderNumber();
    setOrderId(id);
    const details = {
      orderId: id,
      totalBirr: summary.totalBirr,
      totalQuantity: summary.totalQuantity,
      items: state.items,
      phone: cleaned,
      createdAt: new Date().toISOString(),
    };
    setShowPaymentDetails(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-0 max-w-2xl p-0 overflow-hidden">
        <div className="p-6">
          <DialogTitle className="text-xl font-semibold mb-4">Your Cart</DialogTitle>
          {state.items.length === 0 ? (
            <p className="text-muted-foreground">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {state.items.map((it) => (
                <div key={`${it.id}-${it.size}`} className="flex items-center gap-4">
                  <img src={it.image} alt={it.name} className="w-16 h-16 object-contain" />
                  <div className="flex-1">
                    <div className="font-medium">{it.name} {it.size ? `(${it.size})` : ''}</div>
                    <div className="text-sm text-muted-foreground">x{it.quantity} • {it.priceBirr} Birr</div>
                  </div>
                  <div className="font-semibold">{it.priceBirr * it.quantity} Birr</div>
                </div>
              ))}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-sm text-muted-foreground">Total ({summary.totalQuantity} items)</div>
                <div className="text-lg font-bold">{summary.totalBirr} Birr</div>
              </div>

              {/* Phone Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. +251 9XXXXXXXX or 09XXXXXXXX" />
                {phoneError && <p className="text-sm text-red-500">{phoneError}</p>}
              </div>

              <Button onClick={handlePay} className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white">
                Payment Details
              </Button>

              {showPaymentDetails && (
                <div className="mt-6 space-y-4">
                  <DialogTitle className="text-lg font-semibold">Payment Details</DialogTitle>
                  <p className="text-sm text-muted-foreground">Select one of the shop owner’s payment options below. Please verify the details before making payment.</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                      <Landmark className="w-5 h-5 text-brand-primary" />
                      <div>
                        <div className="font-medium">Bank Transfer</div>
                        <div className="text-sm">Abyssinia - 58456648</div>
                        <div className="text-sm">CBE - 1000096604827</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                      <PhoneIcon className="w-5 h-5 text-brand-secondary" />
                      <div>
                        <div className="font-medium">Telebirr</div>
                        <div className="text-sm">+251 929007423</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={() => { clear(); onOpenChange(false); }} variant="secondary" className="w-full">Close</Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}



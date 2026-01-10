import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Package, Calendar, MapPin, CreditCard, Truck, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import orderService, { Order } from '@/services/orderService';
import { toast } from 'sonner';

const OrderDetails = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const navigate = useNavigate();
    const [order, setOrder] = useState<Order | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isCancelling, setIsCancelling] = useState(false);

    useEffect(() => {
        if (orderId) {
            fetchOrder(orderId);
        }
    }, [orderId]);

    const fetchOrder = async (id: string) => {
        try {
            setIsLoading(true);
            const data = await orderService.getOrderById(id);
            setOrder(data);
        } catch (error) {
            console.error('Error fetching order:', error);
            toast.error('Failed to load order details');
            navigate('/orders');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelOrder = async () => {
        if (!order || !orderId) return;

        if (!confirm('Are you sure you want to cancel this order?')) return;

        try {
            setIsCancelling(true);
            await orderService.cancelOrder(orderId);
            toast.success('Order cancelled successfully');
            fetchOrder(orderId);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to cancel order');
        } finally {
            setIsCancelling(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered':
                return 'bg-green-500';
            case 'shipped':
                return 'bg-blue-500';
            case 'processing':
                return 'bg-yellow-500';
            case 'cancelled':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            </div>
        );
    }

    if (!order) return null;

    const canCancel = order.orderStatus === 'pending' || order.orderStatus === 'processing';

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 pt-20 pb-12 bg-background">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="mb-6">
                        <Button variant="ghost" onClick={() => navigate('/orders')}>
                            ← Back to Orders
                        </Button>
                    </div>

                    <Card className="shadow-card">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-2xl">
                                        Order #{order._id.slice(-8).toUpperCase()}
                                    </CardTitle>
                                    <p className="text-muted-foreground mt-1">
                                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <Badge className={getStatusColor(order.orderStatus)}>
                                    {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                                </Badge>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            {/* Customer Information */}
                            <div>
                                <h3 className="font-semibold mb-4 flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Customer Information
                                </h3>
                                <div className="p-4 bg-muted/30 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Name</p>
                                        <p className="font-medium">{order.customerInfo.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Email</p>
                                        <p className="font-medium">{order.customerInfo.email}</p>
                                    </div>
                                    {order.customerInfo.phone && (
                                        <div>
                                            <p className="text-sm text-muted-foreground">Phone</p>
                                            <p className="font-medium">{order.customerInfo.phone}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Order Items */}
                            <div>
                                <h3 className="font-semibold mb-4 flex items-center gap-2">
                                    <Package className="h-5 w-5" />
                                    Order Items
                                </h3>
                                <div className="space-y-3">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                                            <div>
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Size: {item.size} | Quantity: {item.quantity}
                                                </p>
                                                <p className="text-sm font-medium mt-1">${item.price.toFixed(2)} each</p>
                                            </div>
                                            <span className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="bg-muted/50 rounded-lg p-6">
                                <div className="flex justify-between items-center text-lg">
                                    <span className="font-semibold">Total Amount</span>
                                    <span className="font-bold text-primary text-2xl">${order.totalAmount.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div>
                                <h3 className="font-semibold mb-4 flex items-center gap-2">
                                    <MapPin className="h-5 w-5" />
                                    Shipping Address
                                </h3>
                                <div className="p-4 bg-muted/30 rounded-lg">
                                    <p className="font-medium">{order.shippingAddress.street}</p>
                                    <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                                    <p>{order.shippingAddress.country}</p>
                                </div>
                            </div>

                            {/* Payment & Delivery Info */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                                        <CreditCard className="h-5 w-5" />
                                        Payment
                                    </h3>
                                    <div className="p-4 bg-muted/30 rounded-lg">
                                        <p className="text-sm text-muted-foreground">Payment Method</p>
                                        <p className="font-medium capitalize">{order.paymentMethod}</p>
                                        <p className="text-sm text-muted-foreground mt-2">Payment Status</p>
                                        <Badge variant={order.paymentStatus === 'completed' ? 'default' : 'secondary'}>
                                            {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                                        </Badge>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                                        <Truck className="h-5 w-5" />
                                        Delivery Status
                                    </h3>
                                    <div className="p-4 bg-muted/30 rounded-lg">
                                        <p className="text-sm text-muted-foreground">Order Status</p>
                                        <p className="font-medium capitalize">{order.orderStatus}</p>
                                        {order.orderStatus === 'shipped' && (
                                            <p className="text-sm text-muted-foreground mt-2">
                                                Estimated delivery: 3-5 business days
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Cancel Order Button */}
                            {canCancel && (
                                <div className="pt-4 border-t">
                                    <Button
                                        variant="destructive"
                                        onClick={handleCancelOrder}
                                        disabled={isCancelling}
                                        className="w-full md:w-auto"
                                    >
                                        <X className="h-4 w-4 mr-2" />
                                        {isCancelling ? 'Cancelling...' : 'Cancel Order'}
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default OrderDetails;

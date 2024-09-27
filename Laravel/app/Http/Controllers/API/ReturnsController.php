<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Returns;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class ReturnsController extends Controller
{
    public function index()
    {
        //checking returned value 0 or not
        // $returns = Returns::where('returned', '=', 0)->get();
        $returns = Returns::all();
        return response()->json([
            'status' => 200,
            'returns' => $returns,
        ]);
    }
    
    public function submitReviewAndReturn(Request $request)
{
    $request->validate([
        'user_id' => 'required|integer',
        'user_name' => 'required|string',
        'product_id' => 'required|integer',
        'order_id' => 'required|integer',
        'product_name' => 'required|string',
        'return_qty' => 'required|integer',
        'rating' => 'required|integer|min:1|max:5',
        'review' => 'required|string|max:255',
    ]);

    try {
        $existingReturn = Returns::where('user_id', $request->user_id)
            ->where('product_id', $request->product_id)
            ->where('order_id', $request->order_id)
            ->first();

        if ($existingReturn) {
            return response()->json([
                'status' => 409,
                'message' => 'Return already proceeded!',
            ]);
        }

        $return = new Returns([
            'user_id' => $request->user_id,
            'user_name' => $request->user_name,
            'product_id' => $request->product_id,
            'product_name' => $request->product_name,
            'order_id' => $request->order_id,
            'return_qty' => $request->return_qty,
            'rating' => $request->rating,
            'review' => $request->review,
        ]);
        $return->save();

        // Automatically trigger the updateProductRating after saving the review and return
        $this->updateProductRating($request->product_id);

        return response()->json([
            'status' => 201,
            'message' => 'Return and review submitted successfully.',
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 500,
            'message' => 'An error occurred: ' . $e->getMessage(),
        ]);
    }
}


public function updateProductRating($productId)
{
    try {
        // Get all the ratings for the specified product from the Returns table
        $ratings = Returns::where('product_id', $productId)
            ->whereNotNull('rating') // Only consider records where rating is not null
            ->pluck('rating');

        // If no ratings are available, return with an appropriate message
        if ($ratings->isEmpty()) {
            return response()->json([
                'status' => 404,
                'message' => 'No ratings found for this product.',
            ]);
        }

        // Calculate the average rating
        $averageRating = $ratings->avg();

        // Update the product's rating in the Products table
        $product = Product::find($productId);
        
        if ($product) {
            $product->rating = $averageRating;
            $product->save();

            return response()->json([
                'status' => 200,
                'message' => 'Product rating updated successfully.',
                'average_rating' => $averageRating,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found.',
            ]);
        }
    } catch (\Exception $e) {
        // Handle any errors that occur
        return response()->json([
            'status' => 500,
            'message' => 'An error occurred: ' . $e->getMessage(),
        ]);
    }
}



    
    public function addtoreturn(Request $request)
{
    // Validate the request data
    $request->validate([
        'user_id' => 'required|integer',
        'user_name' => 'required|string',
        'product_id' => 'required|integer',
        'order_id' => 'required|integer',
        'product_name' => 'required|string',
        'return_qty' => 'required|integer',
    ]);

    try {
        // Check if the return already exists for the user, product, and order combination
        $existingReturn = Returns::where('user_id', $request->user_id)
            ->where('product_id', $request->product_id)
            ->where('order_id', $request->order_id)
            ->first();

        if ($existingReturn) {
            return response()->json([
                'status' => 409,
                'message' => 'Return already proceeded!',
            ]);
        }

        // Create a new Returns instance and save it to the database
        $return = new Returns([
            'user_id' => $request->user_id,
            'user_name' => $request->user_name,
            'product_id' => $request->product_id,
            'product_name' => $request->product_name,
            'order_id' => $request->order_id,
            'return_qty' => $request->return_qty,
        ]);
        $return->save();

        // Return a success response
        return response()->json([
            'status' => 201,
            'message' => 'Return Initiated.',
        ]);
    } catch (\Exception $e) {
        // Return an error response if there's any exception
        return response()->json([
            'status' => 500,
            'message' => 'An error occurred while processing the request.',
        ]);
    }
}




public function approveReturn(Request $request)
{
    $validatedData = $request->validate([
        'product_id' => 'required|integer',
        'order_id' => 'required|integer',
        'return_id' => 'required|integer',
        'return_qty' => 'required|integer',
    ]);

    $product = Product::find($validatedData['product_id']);
    $order = Order::find($validatedData['order_id']);
    $returns = Returns::find($validatedData['return_id']);

    if (!$product || !$returns || !$order) {
        return response()->json([
            'status' => 404,
            'message' => 'Product, Order, or Return not found',
        ]);
    }

    // Validation passed, increment the product quantity
    $product->qty += $validatedData['return_qty'];
    // removing the data from the Returns table
    $returns->returned = 1;
    // removing the data from the Orders table
    $order->returned = 1;

    $product->save();
    $returns->save();
    $order->save();

    

    return response()->json([
        'status' => 200,
        'message' => 'Return approved successfully.',
    ]);
}




    

    
}

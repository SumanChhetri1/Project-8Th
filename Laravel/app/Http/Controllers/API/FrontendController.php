<?php

namespace App\Http\Controllers\API;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class FrontendController extends Controller
{
    public function category()
    {
        $category = Category::where('status','0')->get();
        return response()->json([
            'status'=>200,
            'category'=>$category
        ]);
    }

    public function product($slug)
    {
        $category = Category::where('slug', $slug)->where('status','0')->first();
        if($category)
        {
            $product = Product::where('category_id', $category->id)->where('status','0')->get();
            if($product)
            {
                return response()->json([
                    'status'=>200,
                    'product_data'=>[
                        'product'=>$product,
                        'category'=>$category,
                    ]
                ]);
            }
            else
            {
                return response()->json([
                    'status'=>400,
                    'message'=>'No Product Available'
                ]);
            }
        }
        else
        {
            return response()->json([
                'status'=>404,
                'message'=>'No Such Category Found'
            ]);
        }
    }


    public function viewproduct($category_slug, $product_slug)
    {
        $category = Category::where('slug',$category_slug)->where('status','0')->first();
        if($category)
        {
            $product = Product::where('category_id', $category->id)
                                ->where('slug',$product_slug)
                                ->where('status','0')
                                ->first();
            if($product)
            {
                return response()->json([
                    'status'=>200,
                    'product'=>$product,
                ]);
            }
            else
            {
                return response()->json([
                    'status'=>400,
                    'message'=>'No Product Available'
                ]);
            }
        }
        else
        {
            return response()->json([
                'status'=>404,
                'message'=>'No Such Category Found'
            ]);
        }
    }

    //fetching all product data
    public function index()
    {
        $products = Product::where('status', '0')->get();

        if ($products->count() > 0) {
            return response()->json([
                'status' => 200,
                'products' => $products,
            ]);
        } else {
            return response()->json([
                'status' => 400,
                'message' => 'No products available',
            ]);
        }
    }
    //fetching feature product product data
    public function getFeaturedProducts()
    {
    $featuredProducts = Product::where('featured', 1)
                                ->where('status', '0') // Ensure the product is active
                                ->get();

    if($featuredProducts->isEmpty())
    {
        return response()->json([
            'status' => 400,
            'message' => 'No Featured Products Available',
        ]);
    }
    
    return response()->json([
        'status' => 200,
        'featured_products' => $featuredProducts,
    ]);
}


}

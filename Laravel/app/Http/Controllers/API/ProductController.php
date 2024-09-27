<?php

namespace App\Http\Controllers\API;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;


class ProductController extends Controller
{

    public function index()
    {
        $products = Product::all();
        return response()->json([
            'status'=>200,
            'products'=>$products
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_id'=>'required|max:191',
            'slug'=>'required|max:191|regex:/^[a-zA-Z0-9\-(), ]+$/|regex:/[a-zA-Z]+/|regex:/[0-9]+/',
            'name'=>'required|max:191|alpha_spaces',
	        // 'meta_title'=>'required|max:191',
            'brand'=>'required|max:20|alpha_spaces',
            'selling_price'=>'required|min:10|max:200|numeric',
            'original_price'=>'required|min:10|max:200|numeric',
            'qty'=>'required|min:1|max:50|numeric',
            'image'=>'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status'=>422,
                'errors'=>$validator->messages(),
            ]);
        }
        else
        {
            $product = new Product;
            $product->category_id = $request->input('category_id');
            $product->slug = $request->input('slug');
            $product->name = $request->input('name');
            $product->description = $request->input('description');

	        $product->meta_title = $request->input('meta_title');
            $product->meta_keyword = $request->input('meta_keyword');
            $product->meta_descrip = $request->input('meta_descrip');

            $product->brand = $request->input('brand');
            $product->selling_price = $request->input('selling_price');
            $product->original_price = $request->input('original_price');
            $product->qty = $request->input('qty');

            if($request->hasFile('image'))
            {
                $file = $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $filename = time() .'.'.$extension;
                $file->move('uploads/product/', $filename);
                $product->image = 'uploads/product/'.$filename;
            }

            $product->featured = $request->input('featured') == true ? '1':'0';
            $product->popular = $request->input('popular') == true ? '1':'0';
            $product->status = $request->input('status') == true ? '1':'0';
            $product->save();

            return response()->json([
                'status'=>200,
                'message'=>'Product Added Successfully',
            ]);
        }
    }

    public function edit($id)
    {
        $product = Product::find($id);
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
                'status'=>404,
                'message'=>'No Product Found',
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'category_id'=>'required|max:191',
            'slug'=>'required|max:191',
            'name'=>'required|max:191',
	        'meta_title'=>'required|max:191',
            'brand'=>'required|max:20',
            'selling_price'=>'required|max:20',
            'original_price'=>'required|max:20',
            'qty'=>'required|max:4',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status'=>422,
                'errors'=>$validator->messages(),
            ]);
        }
        else
        {
            $product = Product::find($id);
            if($product)
            {
                $product->category_id = $request->input('category_id');
                $product->slug = $request->input('slug');
                $product->name = $request->input('name');
                $product->description = $request->input('description');

                $product->meta_title = $request->input('meta_title');
                $product->meta_keyword = $request->input('meta_keyword');
                $product->meta_descrip = $request->input('meta_descrip');

                $product->brand = $request->input('brand');
                $product->selling_price = $request->input('selling_price');
                $product->original_price = $request->input('original_price');
                $product->qty = $request->input('qty');

                if($request->hasFile('image'))
                {
                    $path = $product->image;
                    if(File::exists($path))
                    {
                        File::delete($path);
                    }
                    $file = $request->file('image');
                    $extension = $file->getClientOriginalExtension();
                    $filename = time() .'.'.$extension;
                    $file->move('uploads/product/', $filename);
                    $product->image = 'uploads/product/'.$filename;
                }

                $product->featured = $request->input('featured');
                $product->popular = $request->input('popular');
                $product->status = $request->input('status');
                $product->update();

                return response()->json([
                    'status'=>200,
                    'message'=>'Product Updated Successfully',
                ]);
            }
            else
            {
                return response()->json([
                    'status'=>404,
                    'message'=>'Product Not Found',
                ]);
            }
        }
    }

    public function toggleFeatured($id)
    {
        // Find the product by ID
        $product = Product::find($id);

        if ($product) {
            // Toggle the featured value (if it's 1, make it 0, and vice versa)
            $product->featured = $product->featured == 1 ? 0 : 1;
            $product->save();

            return response()->json([
                'status' => 200,
                'message' => $product->featured == 1 ? 'Product featured successfully' : 'Product unfeatured successfully',
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found',
            ]);
        }
    }

    public function rateProduct(Request $request)
    {
        $request->validate([
            'productId' => 'required|exists:products,id',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        // Update the product rating in the database
        $product = Product::find($request->productId);
        $product->rating = $request->rating; // Update the rating
        $product->save();

        return response()->json(['status' => 200, 'message' => 'Rating submitted successfully.']);
    }
    public function getPopularProducts()
    {
        // Fetch products where rating is 4 or higher
        $popularProducts = Product::where('rating', '>=', 4)->get();

        if ($popularProducts->count() > 0) {
            return response()->json([
                'status' => 200,
                'popular_products' => $popularProducts
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No popular products found'
            ]);
        }
    }


}

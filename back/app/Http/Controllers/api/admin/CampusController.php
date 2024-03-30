<?php

namespace App\Http\Controllers\api\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCampusRequest;
use App\Models\Campus;
use Illuminate\Http\Request;

class CampusController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response([
            'campuses' => Campus::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCampusRequest $request)
    {
        Campus::create($request->all());
        return response([
            'success' => 'Campus added Successful',
        ]);
    }



    public function destroy(Campus $campus)
    {
        $campus->delete();
        return response([
            'success' => 'Campus deleted Successful',
        ]);
    }
}

<?php

namespace App\Models;

use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class FunctionalLocation extends Model
{
    use HasFactory;

    protected $table = 'functional_locations';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $timestamps = true;

    protected $fillable = [
        'id',
        'description',
        'updated_by',
        'created_at',
        'updated_at',
    ];

    public function scopeSearch(Builder $builder, Request $request)
    {
        $search = $request->search;
        $order_by = $request->order_by ?? 'id';
        $sort_by = $request->sort_by ?? 'asc';

        $builder
            ->when($search, function ($query, $search) {
                $query
                    ->where('id', 'LIKE', "%{$search}%")
                    ->orWhere('description', 'LIKE', "%{$search}%")
                    ->orWhere('updated_by', 'LIKE', "%{$search}%");
            })
            ->orderBy($order_by, $sort_by);
    }
}

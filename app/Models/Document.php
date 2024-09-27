<?php

namespace App\Models;

use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Document extends Model
{
    use HasFactory;

    protected $table = 'documents';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $timestamps = true;
    public $incrementing = true;

    protected $fillable = [
        'id',
        'title',
        'attachment',
        'uploaded_by',
        'created_at',
        'updated_at',
    ];

    public function scopeSearch(Builder $builder, Request $request)
    {
        $search = $request->search;

        $builder
            ->when($search, function ($query) use ($search) {
                $query
                    ->orWhere('title', 'LIKE', "%{$search}%");
            });
    }
}

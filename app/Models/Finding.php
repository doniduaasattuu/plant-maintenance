<?php

namespace App\Models;

use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Http\Request;

class Finding extends Model
{
    use HasFactory;

    protected $table = 'findings';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'id',
        'finding_status_id',
        'equipment_id',
        'functional_location_id',
        'description',
        'notification',
        'attachment_before',
        'attachment_after',
        'reported_by',
        'closed_by',
        'created_at',
        'updated_at',
    ];

    public function equipment(): BelongsTo
    {
        return $this->belongsTo(Equipment::class, 'equipment_id', 'id');
    }

    public function scopeSearch(Builder $builder, Request $request)
    {
        $search = $request->search;
        $finding_status_id = $request->finding_status_id;

        $builder
            ->when(($search && $finding_status_id), function ($query) use ($search, $finding_status_id) {
                $query
                    ->where('finding_status_id', '=', $finding_status_id)
                    ->where(function ($query) use ($search) {
                        $query
                            ->where('id', 'LIKE', "%{$search}%")
                            ->orWhere('description', 'LIKE', "%{$search}%");
                    });
            })
            ->when($search && is_null($finding_status_id), function ($query) use ($search) {
                $query
                    ->where('id', 'LIKE', "%{$search}%")
                    ->orWhere('description', 'LIKE', "%{$search}%");
            })
            ->when($finding_status_id && is_null($search), function ($query) use ($finding_status_id) {
                $query
                    ->where('finding_status_id', '=', $finding_status_id);
            });
    }
}

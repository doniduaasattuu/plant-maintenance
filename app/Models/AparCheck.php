<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AparCheck extends Model
{
    use HasFactory;

    protected $table = 'apar_checks';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $timestamps = true;
    public $incrementing = true;

    protected $fillable = [
        'id',
        'seal',
        'weight',
        'pressure',
        'body',
        'remark',
        'checked_by',
        'created_at',
        'updated_at',
    ];

    public function checkingForm()
    {
        return $this->morphOne(EquipmentCheckingForm::class, 'formable');
    }
}

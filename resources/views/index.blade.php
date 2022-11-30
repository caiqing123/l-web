@extends('base')

@section('title', config('app.name'))

@push('scripts')
    @vite(['resources/web/src/main.js'])
@endpush
